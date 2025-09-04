import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Loader2 } from "lucide-react"
import UserModal from "../components/UserModal"

export default function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [open, setOpen] = useState(false)

  // Simulate API fetch
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: "1", name: "Alice Johnson", phone: "1112223333", email: "alice@example.com", city: "Bangalore" },
        { id: "2", name: "Bob Williams", phone: "4445556666", email: "bob@example.com", city: "Hyderabad" },
        { id: "3", name: "Charlie Brown", phone: "7778889999", email: "charlie@example.com", city: "Pune" },
      ])
      setLoading(false)
    }, 800)
  }, [])

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
          <CardContent>{users.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Active</CardTitle></CardHeader>
          <CardContent>{users.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Inactive</CardTitle></CardHeader>
          <CardContent>0</CardContent>
        </Card>
      </div>

      {/* Search */}
      <Input
        placeholder="Search users..."
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
            {filtered.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => { setSelectedUser(user); setOpen(true) }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Modal */}
      <UserModal
        isOpen={open}
        onClose={() => setOpen(false)}
        user={selectedUser}
        onDelete={id => setUsers(users.filter(u => u.id !== id))}
      />
    </div>
  )
}
