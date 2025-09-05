import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { 
  Loader2, 
  Search, 
  UserPlus, 
  ChevronLeft, 
  ChevronRight,
  Users as UsersIcon,
  TrendingUp,
  AlertTriangle,
  MapPin
} from "lucide-react"
import UserModal from "../components/UserModal"
import UserForm from "../components/UserForm"
import { userApi } from "../utils/api"

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, limit: 10, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [formModalOpen, setFormModalOpen] = useState(false)

  const loadUsers = async (params = {}) => {
    try {
      setLoading(true)
      setError(null)
      const response = await userApi.list(params)
      setUsers(response.data)
      setMeta(response.meta)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

 useEffect(() => {
  setError(null)
  setLoading(true)
    fetch("https://loadgo.in/loadgo/getUser")
      .then((res) => res.json())
      .then((data) => {

        const usersArray = Array.isArray(data) ? data : data.data;
        const formatted = usersArray.map((user: any) => ({
          ID: user.id,
          Name: user.name,
          Email: user.email,
          LoginPin: user.loginPin,
          PhoneNo: user.phone,
          CreatedOn: user.createdOn,
          aadharFront: user.aadharFront,
          dlFront: user.licenseFront,
          accountHolderName: user.accountHolderName || "N/A",
          bankName: user.bankName || "N/A",
          accountNumber: user.accountNumber || "N/A",
          IFSCCode: user.IFSCCode || "N/A",
        }));
        setUsers(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);
  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        loadUsers({ search, page: 1 })
      } else {
        loadUsers({ page: 1 })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const handlePageChange = (page: number) => {
    loadUsers({ search, page })
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await userApi.delete(id)
      setUsers(users.filter(u => u.id !== id))
      setModalOpen(false)
      setSelectedUser(null)
      // Reload to update pagination
      loadUsers({ search, page: meta.page })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user')
    }
  }

  const handleUserCreated = () => {
    loadUsers({ search, page: 1 })
  }

  const activeUsers = users.filter(u => u.status === 'active').length
  const inactiveUsers = users.filter(u => u.status === 'inactive').length
  const uniqueCities = new Set(users.filter(u => u.city).map(u => u.city)).size

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Connection Error</h3>
            <p className="text-muted-foreground">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Make sure the backend server is running on http://localhost:5000
            </p>
          </div>
          <Button onClick={() => loadUsers()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage customer accounts and profiles</p>
        </div>
        <Button 
          className="gap-2 bg-primary hover:bg-primary/90"
          onClick={() => setFormModalOpen(true)}
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total Users
            </CardTitle>
            <UsersIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {meta.total}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Registered customers
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inactive Users
            </CardTitle>
            <UsersIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Temporarily inactive
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cities
            </CardTitle>
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCities}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Service locations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name, email, or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 border-0 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin w-5 h-5"/>
                <span>Loading users...</span>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground">
                {search ? 'Try adjusting your search terms' : 'Get started by adding your first user'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50">
                  <TableHead className="font-semibold">User</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Joined</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id} className="border-b border-border/30 hover:bg-muted/30">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {user.id.slice(-8)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{user.phone}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted/50">
                        {user.city || 'Not specified'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => { 
                          setSelectedUser(user); 
                          setModalOpen(true) 
                        }}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(meta.page - 1)}
              disabled={meta.page <= 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={page === meta.page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                );
              })}
              {meta.totalPages > 5 && <span className="text-muted-foreground">...</span>}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(meta.page + 1)}
              disabled={meta.page >= meta.totalPages}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <UserModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onDelete={handleDeleteUser}
      />

      {/* Form Modal */}
      <UserForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSuccess={handleUserCreated}
      />
    </div>
  )
}