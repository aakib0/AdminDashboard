import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  AlertTriangle,
  Users
} from "lucide-react"

interface UserType {
  id: string;
  name: string;
  phone: string;
  email: string;
  city?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserType | null
  onDelete: (id: string) => void
}

export default function UserModal({ isOpen, onClose, user, onDelete }: UserModalProps) {
  if (!user) return null

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      onDelete(user.id)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              user.status === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {user.status === 'active' ? '● Active' : '● Inactive'}
            </span>
            <span className="text-xs text-muted-foreground">
              ID: {user.id}
            </span>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Full Name</p>
                  <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                <div className="p-2 bg-muted rounded-lg">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone Number</p>
                  <p className="text-lg">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                <div className="p-2 bg-muted rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-lg break-all">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                <div className="p-2 bg-muted rounded-lg">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">City</p>
                  <p className="text-lg">{user.city || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Account Created</p>
                  <p className="text-sm font-medium">{new Date(user.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Last Updated</p>
                  <p className="text-sm font-medium">{new Date(user.updatedAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">Customer Profile</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  This user has been registered for {Math.ceil((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Delete User
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}