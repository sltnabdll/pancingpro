import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function AdminSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'Toko Alat Pancing',
    email: 'admin@tokoalatpancing.com',
    phone: '+62 812-3456-7890',
    notifications: true,
    autoApprove: false,
  });

  const handleSave = () => {
    toast({
      title: 'Pengaturan Disimpan',
      description: 'Pengaturan telah berhasil diperbarui.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground mt-2">
          Kelola pengaturan sistem dan preferensi admin
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Umum</CardTitle>
            <CardDescription>
              Pengaturan informasi dasar toko
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nama Toko</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferensi Sistem</CardTitle>
            <CardDescription>
              Kelola pengaturan operasional sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifikasi Email</Label>
                <p className="text-sm text-muted-foreground">
                  Terima notifikasi email untuk pesanan baru
                </p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, notifications: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoApprove">Auto-Approve Pesanan</Label>
                <p className="text-sm text-muted-foreground">
                  Otomatis menyetujui pesanan setelah pembayaran
                </p>
              </div>
              <Switch
                id="autoApprove"
                checked={settings.autoApprove}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoApprove: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            Simpan Pengaturan
          </Button>
        </div>
      </div>
    </div>
  );
}