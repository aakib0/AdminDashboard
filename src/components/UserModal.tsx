import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  user: any
  onDelete: (id: string) => void
}

export default function UserModal({ isOpen, onClose, user, onDelete }: UserModalProps) {
  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">City:</span> {user.city}</p>
        </div>

        <DialogFooter>
          <Button variant="destructive" onClick={() => onDelete(user.id)}>
            Delete User
          </Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
