'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Loader2, ShieldCheck, Target, ClipboardList, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { recruitmentCriteria } from '@/data/initiatives';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  studentId: z.string().optional(),
  department: z.string().min(2, { message: "Department is required." }),
  role: z.enum(["student", "alumni", "faculty"], {
    message: "Please select a role.",
  }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log("Form Data Submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  if (isSuccess) {
    return (
      <div className="container px-4 py-20 mx-auto flex justify-center">
        <Card className="w-full max-w-md text-center py-10">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-green-700">Application Received!</h2>
            <p className="text-muted-foreground">
              Thank you for your interest in joining GURPC. We have received your details and will get back to you shortly.
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
              Submit another response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 text-green-600 dark:text-green-400 border-green-300 dark:border-green-500/30">
            Fixed Yearly Intake
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Join GURPC</h1>
          <p className="text-muted-foreground">
            Become a part of the most active research community at Green University.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Membership Registration</CardTitle>
            <CardDescription>
              Please fill in your correct information.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input id="name" placeholder="John Doe" {...register("name")} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">Department</label>
                  <Input id="department" placeholder="CSE / EEE / Textile" {...register("department")} />
                  {errors.department && <p className="text-sm text-red-500">{errors.department.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="studentId" className="text-sm font-medium">Student ID (Optional)</label>
                  <Input id="studentId" placeholder="2210xxxxx" {...register("studentId")} />
                </div>
              </div>

               <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">I am a...</label>
                <select 
                    id="role" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...register("role")}
                >
                    <option value="">Select your role</option>
                    <option value="student">Current Student</option>
                    <option value="alumni">Alumni</option>
                    <option value="faculty">Faculty Member</option>
                </select>
                {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Why do you want to join? (Optional)</label>
                <Textarea 
                    id="message" 
                    placeholder="Tell us about your research interests..." 
                    className="min-h-[100px]"
                    {...register("message")} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                ) : (
                    "Submit Application"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* ══════════ RECRUITMENT CRITERIA & BENCHMARKS ══════════ */}
      <div className="max-w-4xl mx-auto mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Recruitment Criteria & Benchmarks</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            GURPC follows a structured selection process with clear criteria to ensure quality membership and committed participants.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {recruitmentCriteria.map((criteria, i) => {
            const icons = [ShieldCheck, Target, ClipboardList, Calendar];
            const Icon = icons[i] || ShieldCheck;
            return (
              <Card key={criteria.id} className="border-green-100 dark:border-green-900/20 hover:border-green-300 dark:hover:border-green-500/30 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{criteria.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">{criteria.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {criteria.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Training CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Selected members start with Foundation Research Training.</p>
          <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30">
            <Link href="/training">View Training Programs <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
