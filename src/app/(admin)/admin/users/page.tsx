'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  UserPlus,
  Mail,
  Shield,
  MoreHorizontal,
  Crown,
  User,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type UserRole = 'admin' | 'manager' | 'viewer'

interface TeamMember {
  id: string
  name: string
  email: string
  role: UserRole
  status: 'active' | 'pending'
  createdAt: string
}

// Mock data - in production this would come from Supabase
const mockUsers: TeamMember[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@powerroute.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
  },
]

const roleIcons = {
  admin: Crown,
  manager: Shield,
  viewer: Eye,
}

const roleColors = {
  admin: 'bg-purple-100 text-purple-800',
  manager: 'bg-blue-100 text-blue-800',
  viewer: 'bg-gray-100 text-gray-800',
}

export default function UsersPage() {
  const [users] = useState<TeamMember[]>(mockUsers)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<UserRole>('viewer')

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address')
      return
    }
    toast.success(`Invitation sent to ${inviteEmail}`)
    setInviteEmail('')
    setShowInviteDialog(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-500 mt-1">Manage team members and their access levels</p>
        </div>
        <Button onClick={() => setShowInviteDialog(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Role Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Admin</h3>
            </div>
            <p className="text-sm text-purple-700">
              Full access to all features, settings, and team management
            </p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Manager</h3>
            </div>
            <p className="text-sm text-blue-700">
              Can manage leads, view reports, but cannot change settings
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 bg-gray-50/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Viewer</h3>
            </div>
            <p className="text-sm text-gray-700">
              Read-only access to leads and reports
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            {users.length} {users.length === 1 ? 'member' : 'members'} in your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => {
              const RoleIcon = roleIcons[user.role]
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        {user.status === 'pending' && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={roleColors[user.role]}>
                      <RoleIcon className="mr-1 h-3 w-3" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No team members yet</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowInviteDialog(true)}
              >
                Invite your first team member
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Dialog */}
      <AlertDialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invite Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Send an invitation email to add a new team member
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as UserRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Viewer - Read-only access
                    </div>
                  </SelectItem>
                  <SelectItem value="manager">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Manager - Manage leads
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Admin - Full access
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleInvite}>
              <Mail className="mr-2 h-4 w-4" />
              Send Invite
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
