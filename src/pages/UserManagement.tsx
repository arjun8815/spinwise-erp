
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

type User = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: "admin" | "manager" | "employee";
  preferred_language: string;
};

const userFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  role: z.enum(["admin", "manager", "employee"]),
  language: z.enum(["english", "tamil", "telugu", "hindi", "kannada"]),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const UserManagement: React.FC = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleFilterValue, setRoleFilterValue] = useState<string | undefined>(undefined);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: "employee",
      language: "english",
      password: "",
    },
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchUsers();
  }, [isAdmin, navigate, roleFilterValue]);

  useEffect(() => {
    if (selectedUser && openEditDialog) {
      form.reset({
        email: selectedUser.email,
        firstName: selectedUser.first_name || "",
        lastName: selectedUser.last_name || "",
        phone: selectedUser.phone || "",
        role: selectedUser.role,
        language: selectedUser.preferred_language,
      });
    } else if (openAddDialog) {
      form.reset({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        role: "employee",
        language: "english",
        password: "",
      });
    }
  }, [selectedUser, openEditDialog, openAddDialog, form]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let query = supabase.from("profiles").select("*");
      
      if (roleFilterValue) {
        query = query.eq("role", roleFilterValue);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching users:", error);
        return;
      }
      
      setUsers(data as User[]);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const onAddUser = async (data: UserFormValues) => {
    if (!data.password) {
      toast({
        title: "Password required",
        description: "Password is required when adding a new user",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        user_metadata: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          preferred_language: data.language,
          role: data.role,
        },
      });

      if (signUpError) {
        toast({
          title: "Error adding user",
          description: signUpError.message,
          variant: "destructive",
        });
        return;
      }

      // User was added via the auth API, the trigger will handle profile creation
      toast({
        title: "User added successfully",
        description: `${data.firstName} ${data.lastName} has been added as a ${data.role}.`,
      });
      
      setOpenAddDialog(false);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error adding user",
        description: error.message || "An error occurred while adding the user.",
        variant: "destructive",
      });
    }
  };

  const onUpdateUser = async (data: UserFormValues) => {
    if (!selectedUser) return;

    try {
      // Update profile in the database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          preferred_language: data.language,
          role: data.role,
        })
        .eq("id", selectedUser.id);

      if (updateError) {
        toast({
          title: "Error updating user",
          description: updateError.message,
          variant: "destructive",
        });
        return;
      }

      // If password was provided, update user's password
      if (data.password) {
        const { error: passwordError } = await supabase.auth.admin.updateUserById(
          selectedUser.id,
          { password: data.password }
        );

        if (passwordError) {
          toast({
            title: "Error updating password",
            description: passwordError.message,
            variant: "destructive",
          });
          return;
        }
      }

      toast({
        title: "User updated successfully",
        description: `${data.firstName} ${data.lastName}'s information has been updated.`,
      });
      
      setOpenEditDialog(false);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error updating user",
        description: error.message || "An error occurred while updating the user.",
        variant: "destructive",
      });
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const renderLanguageLabel = (lang: string) => {
    switch (lang) {
      case "english": return "English";
      case "tamil": return "தமிழ்";
      case "telugu": return "తెలుగు";
      case "hindi": return "हिंदी";
      case "kannada": return "ಕನ್ನಡ";
      default: return lang;
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("user_management")}</h1>
            <p className="text-muted-foreground mt-1">
              {t("manage_users_and_roles")}
            </p>
          </div>
          <Button onClick={() => setOpenAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("add_user")}
          </Button>
        </div>

        <Card className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{t("all_users")}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t("filter_by_role")}:</span>
              <Select
                value={roleFilterValue}
                onValueChange={(value) => setRoleFilterValue(value || undefined)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("all_roles")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t("all_roles")}</SelectItem>
                  <SelectItem value="admin">{t("admin")}</SelectItem>
                  <SelectItem value="manager">{t("manager")}</SelectItem>
                  <SelectItem value="employee">{t("employee")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("email")}</TableHead>
                  <TableHead>{t("phone")}</TableHead>
                  <TableHead>{t("role")}</TableHead>
                  <TableHead>{t("preferred_language")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      {t("no_users_found")}
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.first_name} {user.last_name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <UserCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {renderLanguageLabel(user.preferred_language)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">{t("edit")}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Card>

        {/* Add User Dialog */}
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("add_new_user")}</DialogTitle>
              <DialogDescription>
                {t("add_user_description")}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddUser)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("first_name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("first_name")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("last_name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("last_name")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("phone")}</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("role")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_role")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">{t("admin")}</SelectItem>
                          <SelectItem value="manager">{t("manager")}</SelectItem>
                          <SelectItem value="employee">{t("employee")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("preferred_language")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_language")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">{renderLanguageLabel("english")}</SelectItem>
                          <SelectItem value="tamil">{renderLanguageLabel("tamil")}</SelectItem>
                          <SelectItem value="telugu">{renderLanguageLabel("telugu")}</SelectItem>
                          <SelectItem value="hindi">{renderLanguageLabel("hindi")}</SelectItem>
                          <SelectItem value="kannada">{renderLanguageLabel("kannada")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">{t("add_user")}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("edit_user")}</DialogTitle>
              <DialogDescription>
                {t("edit_user_description")}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onUpdateUser)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("first_name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("first_name")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("last_name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("last_name")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("phone")}</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("role")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_role")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">{t("admin")}</SelectItem>
                          <SelectItem value="manager">{t("manager")}</SelectItem>
                          <SelectItem value="employee">{t("employee")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("preferred_language")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_language")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">{renderLanguageLabel("english")}</SelectItem>
                          <SelectItem value="tamil">{renderLanguageLabel("tamil")}</SelectItem>
                          <SelectItem value="telugu">{renderLanguageLabel("telugu")}</SelectItem>
                          <SelectItem value="hindi">{renderLanguageLabel("hindi")}</SelectItem>
                          <SelectItem value="kannada">{renderLanguageLabel("kannada")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("new_password")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Leave blank to keep current password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">{t("update_user")}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
};

export default UserManagement;
