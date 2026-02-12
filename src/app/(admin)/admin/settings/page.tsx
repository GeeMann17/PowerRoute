'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Save, Building2, Mail, Phone, MapPin, Loader2, Palette, Monitor, Moon, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from '@/components/theme-provider'
import { THEMES, type ThemeId } from '@/lib/theme'

const themeIcons: Record<ThemeId, React.ReactNode> = {
  light: <Monitor className="h-5 w-5" />,
  dark: <Moon className="h-5 w-5" />,
  corporate: <Briefcase className="h-5 w-5" />,
}

const themePreviews: Record<ThemeId, { bg: string; accent: string; text: string }> = {
  light: { bg: 'bg-[#FAFAF5]', accent: 'bg-[#FFE600]', text: 'text-black' },
  dark: { bg: 'bg-[#0A0A0A]', accent: 'bg-[#39FF14]', text: 'text-[#F0F0E8]' },
  corporate: { bg: 'bg-white', accent: 'bg-[#FF6B35]', text: 'text-[#0A0A2E]' },
}

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const { theme, setTheme } = useTheme()

  // Company settings state
  const [companyName, setCompanyName] = useState('PowerRoute')
  const [companyPhone, setCompanyPhone] = useState('1-800-555-RACK')
  const [companyEmail, setCompanyEmail] = useState('info@powerroute.com')
  const [companyAddress, setCompanyAddress] = useState('')

  // Notification settings
  const [adminEmail, setAdminEmail] = useState('')
  const [sendLeadNotifications, setSendLeadNotifications] = useState(true)

  const handleSaveCompany = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Company settings saved')
    setIsSaving(false)
  }

  const handleSaveNotifications = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Notification settings saved')
    setIsSaving(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your company and application settings</p>
      </div>

      {/* Site Theme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Site Theme
          </CardTitle>
          <CardDescription>
            Change the look and feel of the public-facing website. Takes effect immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(THEMES) as ThemeId[]).map((id) => {
              const t = THEMES[id]
              const preview = themePreviews[id]
              const isActive = theme === id
              return (
                <button
                  key={id}
                  onClick={() => {
                    setTheme(id)
                    toast.success(`Theme changed to ${t.name}`)
                  }}
                  className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                    isActive
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  {/* Mini preview */}
                  <div className={`${preview.bg} rounded-md border border-border/50 p-3 mb-3`}>
                    <div className={`${preview.accent} h-2 w-16 rounded-full mb-2`} />
                    <div className={`${preview.accent}/20 h-2 w-24 rounded-full mb-2`} />
                    <div className={`${preview.accent}/10 h-2 w-20 rounded-full`} />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    {themeIcons[id]}
                    <span className="font-medium text-foreground">{t.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                  {isActive && (
                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
          <CardDescription>
            Update your company details shown on the website and in communications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyPhone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyPhone"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  placeholder="1-800-XXX-XXXX"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Contact Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyEmail"
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  placeholder="contact@company.com"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Business Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyAddress"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  placeholder="123 Main St, City, ST 12345"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveCompany} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Configure how and where you receive lead notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Notification Email</Label>
            <Input
              id="adminEmail"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@company.com"
            />
            <p className="text-sm text-muted-foreground">
              New lead notifications will be sent to this email address
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium text-foreground">Lead Notifications</p>
              <p className="text-sm text-muted-foreground">Receive an email when a new lead is submitted</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sendLeadNotifications}
                onChange={(e) => setSendLeadNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveNotifications} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg">
            <div>
              <p className="font-medium text-destructive">Delete All Leads</p>
              <p className="text-sm text-muted-foreground">
                Permanently remove all leads from the database. This cannot be undone.
              </p>
            </div>
            <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
              Delete All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
