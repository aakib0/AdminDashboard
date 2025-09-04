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
  FileText, 
  CreditCard, 
  IdCard,
  Calendar,
  AlertTriangle,
  ExternalLink
} from "lucide-react"

interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  city?: string;
  license?: string;
  aadhar?: string;
  pan?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface DriverModalProps {
  isOpen: boolean
  onClose: () => void
  driver: Driver | null
  onDelete: (id: string) => void
}

export default function DriverModal({ isOpen, onClose, driver, onDelete }: DriverModalProps) {
  if (!driver) return null

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${driver.name}? This action cannot be undone.`)) {
      onDelete(driver.id)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Driver Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              driver.status === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {driver.status === 'active' ? '● Active' : '● Inactive'}
            </span>
            <span className="text-xs text-muted-foreground">
              ID: {driver.id}
            </span>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Full Name</p>
                  <p className="text-lg">{driver.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone Number</p>
                  <p className="text-lg">{driver.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-lg break-all">{driver.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">City</p>
                  <p className="text-lg">{driver.city || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Documents Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Documents</h3>
            <div className="grid gap-3">
              {/* License */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    driver.license ? 'bg-green-100 dark:bg-green-900/20' : 'bg-muted'
                  }`}>
                    <FileText className={`w-4 h-4 ${
                      driver.license ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">Driving License</p>
                    <p className="text-sm text-muted-foreground">
                      {driver.license ? 'Document uploaded' : 'Not uploaded'}
                    </p>
                  </div>
                </div>
                {driver.license && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={driver.license} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </a>
                  </Button>
                )}
              </div>

              {/* Aadhar */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    driver.aadhar ? 'bg-green-100 dark:bg-green-900/20' : 'bg-muted'
                  }`}>
                    <IdCard className={`w-4 h-4 ${
                      driver.aadhar ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">Aadhar Card</p>
                    <p className="text-sm text-muted-foreground">
                      {driver.aadhar ? 'Document uploaded' : 'Not uploaded'}
                    </p>
                  </div>
                </div>
                {driver.aadhar && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={driver.aadhar} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </a>
                  </Button>
                )}
              </div>

              {/* PAN */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    driver.pan ? 'bg-green-100 dark:bg-green-900/20' : 'bg-muted'
                  }`}>
                    <CreditCard className={`w-4 h-4 ${
                      driver.pan ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">PAN Card</p>
                    <p className="text-sm text-muted-foreground">
                      {driver.pan ? 'Document uploaded' : 'Not uploaded'}
                    </p>
                  </div>
                </div>
                {driver.pan && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={driver.pan} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Timestamps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Joined</p>
                  <p className="text-sm">{new Date(driver.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm">{new Date(driver.updatedAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
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
            Delete Driver
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}