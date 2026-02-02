import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCertificates, useCreateCertificate, useDeleteCertificate } from "@/hooks/use-certificates";
import { useGallery, useCreateGalleryItem, useDeleteGalleryItem } from "@/hooks/use-gallery";
import { useContactMessages } from "@/hooks/use-contact";
import { DataTable } from "@/components/ui/table"; // Assuming standard Shadcn table structure or custom
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCertificateSchema, insertGalleryItemSchema } from "@shared/schema";
import { QRCodeSVG } from "qrcode.react";
import { Trash2, Plus, Download, ExternalLink } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) setLocation("/login");
  }, [user, isLoading, setLocation]);

  if (isLoading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <h1 className="font-serif text-3xl font-bold mb-8 text-primary">Admin Dashboard</h1>
        
        <Tabs defaultValue="certificates" className="w-full">
          <TabsList className="bg-white border border-border p-1 rounded-lg mb-8">
            <TabsTrigger value="certificates" className="data-[state=active]:bg-secondary data-[state=active]:text-primary px-6">Certificates</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-secondary data-[state=active]:text-primary px-6">Gallery</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-secondary data-[state=active]:text-primary px-6">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="certificates">
            <CertificatesManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function CertificatesManager() {
  const { data: certificates } = useCertificates();
  const { mutate: deleteCert } = useDeleteCertificate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <h3 className="font-serif text-xl font-bold">Issued Certificates</h3>
        <CreateCertificateDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cert No</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Issued</TableHead>
            <TableHead>QR</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates?.map((cert) => (
            <TableRow key={cert.id}>
              <TableCell className="font-mono font-medium">{cert.certificateNumber}</TableCell>
              <TableCell>{cert.studentName}</TableCell>
              <TableCell>{cert.courseName}</TableCell>
              <TableCell>{cert.grade}</TableCell>
              <TableCell>{cert.issueDate}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm"><ExternalLink className="w-4 h-4 mr-2" /> View QR</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md text-center">
                    <DialogHeader>
                      <DialogTitle>{cert.studentName} - {cert.certificateNumber}</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center p-6 bg-white rounded-lg">
                      <QRCodeSVG 
                        value={`${window.location.origin}/verify?certificate=${cert.certificateNumber}`} 
                        size={256}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <Button onClick={() => window.print()}>Print Certificate</Button>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="destructive" size="icon" onClick={() => deleteCert(cert.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CreateCertificateDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { mutate: createCert, isPending } = useCreateCertificate();
  const form = useForm({
    resolver: zodResolver(insertCertificateSchema),
    defaultValues: {
      studentName: "",
      certificateNumber: `LUX-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      courseName: "",
      courseDuration: "",
      attendancePercentage: 100,
      grade: "A",
      issueDate: new Date().toISOString().split('T')[0],
      studentPhoto: "",
    }
  });

  function onSubmit(data: any) {
    createCert(data, {
      onSuccess: () => {
        onOpenChange(false);
        form.reset();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white"><Plus className="w-4 h-4 mr-2" /> Issue New</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Issue New Certificate</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="studentName" render={({ field }) => (
              <FormItem><FormLabel>Student Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="certificateNumber" render={({ field }) => (
                <FormItem><FormLabel>Cert Number</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="issueDate" render={({ field }) => (
                <FormItem><FormLabel>Issue Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="courseName" render={({ field }) => (
              <FormItem><FormLabel>Course Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />
             <div className="grid grid-cols-3 gap-4">
              <FormField control={form.control} name="courseDuration" render={({ field }) => (
                <FormItem><FormLabel>Duration</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="grade" render={({ field }) => (
                <FormItem><FormLabel>Grade</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="attendancePercentage" render={({ field }) => (
                <FormItem><FormLabel>Attendance %</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} /></FormControl></FormItem>
              )} />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">Issue Certificate</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function GalleryManager() {
  const { data: items } = useGallery();
  const { mutate: deleteItem } = useDeleteGalleryItem();
  const { mutate: createItem, isPending } = useCreateGalleryItem();
  const form = useForm({
    resolver: zodResolver(insertGalleryItemSchema),
    defaultValues: { title: "", imageUrl: "", category: "Hair" }
  });

  const onSubmit = (data: any) => {
    createItem(data, { onSuccess: () => form.reset() });
  };

  return (
    <div className="space-y-8">
      {/* Add Form */}
      <div className="bg-white p-6 rounded-xl border border-border">
        <h3 className="font-bold mb-4">Add to Gallery</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-end">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem className="flex-1"><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />
            <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem className="flex-1"><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl></FormItem>
            )} />
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem className="w-40">
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="Hair">Hair</SelectItem>
                    <SelectItem value="Makeup">Makeup</SelectItem>
                    <SelectItem value="Nails">Nails</SelectItem>
                    <SelectItem value="Academy">Academy</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />
            <Button type="submit" disabled={isPending}>Add Image</Button>
          </form>
        </Form>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items?.map((item) => (
          <div key={item.id} className="group relative rounded-lg overflow-hidden aspect-square border border-border">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
              <p className="font-bold">{item.title}</p>
              <p className="text-xs text-white/70 mb-4">{item.category}</p>
              <Button variant="destructive" size="sm" onClick={() => deleteItem(item.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesViewer() {
  const { data: messages } = useContactMessages();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages?.map((msg) => (
            <TableRow key={msg.id}>
              <TableCell className="whitespace-nowrap text-muted-foreground text-xs">
                {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : '-'}
              </TableCell>
              <TableCell className="font-medium">{msg.name}</TableCell>
              <TableCell>{msg.email}</TableCell>
              <TableCell className="max-w-md truncate" title={msg.message}>{msg.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
