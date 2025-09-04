import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Loader2 } from "lucide-react"
import DriverModal from "../components/DriverModal"

export default function Dashboard() {
  const [drivers, setDrivers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedDriver, setSelectedDriver] = useState<any | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDrivers([
        { id: "1", name: "John Doe", phone: "1234567890", email: "john@example.com", city: "Delhi", license: "#", aadhar: "#", pan: "#" },
        { id: "2", name: "Jane Smith", phone: "9876543210", email: "jane@example.com", city: "Mumbai" },
      ])
      setLoading(false)
    }, 800)
  }, [])

  const filtered = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Drivers</CardTitle></CardHeader>
          <CardContent>{drivers.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Active</CardTitle></CardHeader>
          <CardContent>{drivers.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Inactive</CardTitle></CardHeader>
          <CardContent>0</CardContent>
        </Card>
      </div>

      {/* Search */}
      <Input
        placeholder="Search drivers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin h-6 w-6"/>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(driver => (
              <TableRow key={driver.id}>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.email}</TableCell>
                <TableCell>{driver.city}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => { setSelectedDriver(driver); setOpen(true) }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Modal */}
      <DriverModal
        isOpen={open}
        onClose={() => setOpen(false)}
        driver={selectedDriver}
        onDelete={id => setDrivers(drivers.filter(d => d.id !== id))}
      />
    </div>
  )
}
