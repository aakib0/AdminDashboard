import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { 
  Loader2, 
  Search, 
  Filter, 
  UserPlus, 
  ChevronLeft, 
  ChevronRight,
  Car,
  Users,
  AlertTriangle,
  TrendingUp
} from "lucide-react"
import DriverModal from "../components/DriverModal"
import DriverForm from "../components/DriverForm"
import { driverApi } from "../utils/api"

interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  license?: string;
  aadhar?: string;
  pan?: string;
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

export default function Dashboard() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, limit: 10, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [formModalOpen, setFormModalOpen] = useState(false)

  const loadDrivers = async (params = {}) => {
    try {
      setLoading(true)
      setError(null)
      const response = await driverApi.list(params)
      setDrivers(response.data)
      setMeta(response.meta)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load drivers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDrivers()
  }, [])

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        loadDrivers({ search, page: 1 })
      } else {
        loadDrivers({ page: 1 })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const handlePageChange = (page: number) => {
    loadDrivers({ search, page })
  }

  const handleDeleteDriver = async (id: string) => {
    try {
      await driverApi.delete(id)
      setDrivers(drivers.filter(d => d.id !== id))
      setModalOpen(false)
      setSelectedDriver(null)
      // Reload to update pagination
      loadDrivers({ search, page: meta.page })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete driver')
    }
  }

  const handleDriverCreated = () => {
    loadDrivers({ search, page: 1 })
  }

  const activeDrivers = drivers.filter(d => d.status === 'active').length
  const inactiveDrivers = drivers.filter(d => d.status === 'inactive').length

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
          <Button onClick={() => loadDrivers()} variant="outline">
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
          <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
          <p className="text-muted-foreground">Manage your driver accounts and documentation</p>
        </div>
        <Button 
          className="gap-2 bg-primary hover:bg-primary/90"
          onClick={() => setFormModalOpen(true)}
        >
          <UserPlus className="w-4 h-4" />
          Add Driver
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              Total Drivers
            </CardTitle>
            <Car className="w-4 h-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {meta.total}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Registered accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Drivers
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDrivers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inactive Drivers
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveDrivers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Temporarily inactive
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Documents
            </CardTitle>
            <Filter className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {drivers.filter(d => d.license && d.aadhar && d.pan).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Complete profiles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search drivers by name, email, or phone..."
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
                <span>Loading drivers...</span>
              </div>
            </div>
          ) : drivers.length === 0 ? (
            <div className="text-center py-12">
              <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No drivers found</h3>
              <p className="text-muted-foreground">
                {search ? 'Try adjusting your search terms' : 'Get started by adding your first driver'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50">
                  <TableHead className="font-semibold">Driver</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Documents</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map(driver => (
                  <TableRow key={driver.id} className="border-b border-border/30 hover:bg-muted/30">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {driver.id.slice(-8)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{driver.phone}</p>
                        <p className="text-xs text-muted-foreground">{driver.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted/50">
                        {driver.city || 'Not specified'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        driver.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {driver.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {driver.license && (
                          <span className="w-2 h-2 bg-green-500 rounded-full" title="License" />
                        )}
                        {driver.aadhar && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full" title="Aadhar" />
                        )}
                        {driver.pan && (
                          <span className="w-2 h-2 bg-purple-500 rounded-full" title="PAN" />
                        )}
                        {!driver.license && !driver.aadhar && !driver.pan && (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => { 
                          setSelectedDriver(driver); 
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
            Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} drivers
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
      <DriverModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedDriver(null)
        }}
        driver={selectedDriver}
        onDelete={handleDeleteDriver}
      />

      {/* Form Modal */}
      <DriverForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSuccess={handleDriverCreated}
      />
    </div>
  )
}