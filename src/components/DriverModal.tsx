import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"

interface DriverModalProps {
  isOpen: boolean
  onClose: () => void
  driver: any
  onDelete: (id: string) => void
}

export default function DriverModal({ isOpen, onClose, driver, onDelete }: DriverModalProps) {
  if (!driver) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Driver Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <p><span className="font-semibold">Name:</span> {driver.name}</p>
            <p><span className="font-semibold">Phone:</span> {driver.phone}</p>
            <p><span className="font-semibold">Email:</span> {driver.email}</p>
            <p><span className="font-semibold">City:</span> {driver.city}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Documents</h3>
            <div className="grid gap-2">
              {driver.license && (
                <a href={driver.license} target="_blank" className="text-blue-500 hover:underline">
                  License
                </a>
              )}
              {driver.aadhar && (
                <a href={driver.aadhar} target="_blank" className="text-blue-500 hover:underline">
                  Aadhar
                </a>
              )}
              {driver.pan && (
                <a href={driver.pan} target="_blank" className="text-blue-500 hover:underline">
                  PAN
                </a>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="destructive" onClick={() => onDelete(driver.id)}>
            Delete Driver
          </Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
