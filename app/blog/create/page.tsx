'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import {
  Loader2,
  ArrowLeft,
  PenLine,
  Type,
  FileText,
  AlignLeft,
  ImagePlus,
  X,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/providers/AuthProvider';
import GlowingOrb from '@/components/effects/GlowingOrb';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateBlogPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
    },
  });

  const titleValue = watch('title');
  const contentValue = watch('content');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be under 5MB.');
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  async function onSubmit(values: FormValues) {
    if (!user) return;

    try {
      setIsLoading(true);
      setSubmitError(null);
      const supabase = createClient();

      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from('blog-images').getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const slugBase = values.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      const slug = `${slugBase}-${Date.now()}`;

      const { error: dbError } = await supabase.from('blogs').insert({
        title: values.title,
        slug: slug,
        excerpt: values.excerpt,
        content: values.content,
        image_url: imageUrl,
        author_id: user.id,
      });

      if (dbError) {
        console.error('DB error:', dbError);
        throw dbError;
      }

      router.push('/blog');
      router.refresh();
    } catch (error) {
      console.error('Error creating post:', error);
      setSubmitError('Failed to publish. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] flex flex-col items-center justify-center gap-6 px-4">
        <div className="cyber-card rounded-2xl p-10 text-center max-w-md w-full">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <PenLine className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            You must be logged in to create a blog post.
          </p>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/20 font-mono text-sm"
          >
            Log In to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 relative overflow-hidden">
      <GlowingOrb color="bg-green-500" size="w-[500px] h-[500px]" position="top-[20%] right-[-200px]" blur="blur-[150px]" opacity="opacity-5" />
      <GlowingOrb color="bg-emerald-500" size="w-[400px] h-[400px]" position="bottom-[10%] left-[-150px]" blur="blur-[120px]" opacity="opacity-5" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors font-mono flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> back_to_blog
          </Link>
        </div>

        {/* Main card */}
        <div className="cyber-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/20 flex items-center justify-center">
              <PenLine className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <span className="text-green-600/60 dark:text-green-400/60 font-mono text-xs">
                ~/blog/create
              </span>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Write a New Post
              </h1>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-8 ml-[52px] text-sm">
            Share your research insights, tutorials, or stories with the GURPC community.
          </p>

          {/* Error banner */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm text-red-600 dark:text-red-400 font-mono">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Type className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span className="font-mono">title</span>
                <span className="text-red-400">*</span>
              </label>
              <input
                {...register('title')}
                placeholder="e.g. Getting Started with Transformer Models"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-green-500/15 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all text-sm"
              />
              {errors.title && (
                <p className="mt-1.5 text-xs text-red-500 font-mono flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {errors.title.message}
                </p>
              )}
              {titleValue && (
                <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
                  slug: {titleValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <ImagePlus className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span className="font-mono">cover_image</span>
                <span className="text-slate-400 font-normal text-xs">(optional)</span>
              </label>

              {!previewUrl ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-200 dark:border-green-500/15 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-green-500/40 hover:bg-green-500/[0.02] transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center group-hover:bg-green-500/10 transition-colors">
                    <ImagePlus className="w-5 h-5 text-slate-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      Click to upload a cover image
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      PNG, JPG, WebP up to 5MB
                    </p>
                  </div>
                </button>
              ) : (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-green-500/15">
                      <Image
                        src={previewUrl}
                        alt="Cover preview"
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-red-500 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs text-white/80 font-mono bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                      {imageFile?.name}
                    </span>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <AlignLeft className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span className="font-mono">excerpt</span>
                <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register('excerpt')}
                rows={3}
                placeholder="A short summary that appears in the blog listing — make it compelling!"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-green-500/15 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all text-sm resize-none"
              />
              {errors.excerpt ? (
                <p className="mt-1.5 text-xs text-red-500 font-mono flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {errors.excerpt.message}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                  Shown as the preview text on the blog listing page.
                </p>
              )}
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <FileText className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  <span className="font-mono">content</span>
                  <span className="text-red-400">*</span>
                </label>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  {(contentValue || '').length} chars
                </span>
              </div>

              {/* Markdown tips bar */}
              <div className="flex items-center gap-2 mb-2 px-1 flex-wrap">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">tips:</span>
                {[
                  { label: '**bold**', title: 'Bold' },
                  { label: '## Heading', title: 'Heading' },
                  { label: '- list item', title: 'List' },
                  { label: '[text](url)', title: 'Link' },
                  { label: '> quote', title: 'Quote' },
                  { label: '`code`', title: 'Code' },
                ].map((tip) => (
                  <span
                    key={tip.label}
                    title={tip.title}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 font-mono border border-slate-200 dark:border-green-500/10"
                  >
                    {tip.label}
                  </span>
                ))}
              </div>

              <textarea
                {...register('content')}
                rows={16}
                placeholder={"Start writing your post here...\n\nYou can use Markdown formatting:\n## Section Heading\nRegular paragraph text with **bold** and [links](https://example.com).\n\n- Bullet points\n- Another item\n\n> Blockquotes for emphasis"}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-green-500/15 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all text-sm font-mono leading-relaxed resize-y min-h-[350px]"
              />
              {errors.content ? (
                <p className="mt-1.5 text-xs text-red-500 font-mono flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {errors.content.message}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                  Minimum 50 characters. Markdown formatting is supported.
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 dark:border-green-500/10" />

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-green-500/15 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.03] hover:border-slate-300 dark:hover:border-green-500/30 transition-all text-sm font-mono disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-green-600/50 disabled:to-emerald-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 font-mono text-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
