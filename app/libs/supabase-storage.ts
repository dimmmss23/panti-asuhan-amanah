import { supabase } from './supabase'

const BUCKET_NAME = 'images'

/**
 * Upload gambar ke Supabase Storage
 * @param file - File yang akan diupload
 * @param folder - Folder tujuan (opsional, contoh: 'dokumentasi', 'profil')
 * @returns URL publik gambar atau null jika gagal
 */
export async function uploadImage(file: File, folder?: string): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = folder ? `${folder}/${fileName}` : fileName

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('Error uploading image:', error.message)
            return null
        }

        const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath)

        return urlData.publicUrl
    } catch (error) {
        console.error('Error uploading image:', error)
        return null
    }
}

/**
 * Hapus gambar dari Supabase Storage
 * @param imageUrl - URL publik gambar atau path gambar
 * @returns true jika berhasil, false jika gagal
 */
export async function deleteImage(imageUrl: string): Promise<boolean> {
    try {
        // Extract path from URL
        const path = extractPathFromUrl(imageUrl)
        
        if (!path) {
            console.error('Invalid image URL')
            return false
        }

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([path])

        if (error) {
            console.error('Error deleting image:', error.message)
            return false
        }

        return true
    } catch (error) {
        console.error('Error deleting image:', error)
        return false
    }
}

/**
 * Hapus multiple gambar dari Supabase Storage
 * @param imageUrls - Array URL publik gambar
 * @returns true jika berhasil, false jika gagal
 */
export async function deleteMultipleImages(imageUrls: string[]): Promise<boolean> {
    try {
        const paths = imageUrls
            .map(url => extractPathFromUrl(url))
            .filter((path): path is string => path !== null)

        if (paths.length === 0) {
            return true
        }

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove(paths)

        if (error) {
            console.error('Error deleting images:', error.message)
            return false
        }

        return true
    } catch (error) {
        console.error('Error deleting images:', error)
        return false
    }
}

/**
 * Dapatkan URL publik dari path gambar
 * @param path - Path gambar di storage
 * @returns URL publik gambar
 */
export function getImageUrl(path: string): string {
    const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(path)

    return data.publicUrl
}

/**
 * List semua gambar dalam folder
 * @param folder - Nama folder (opsional)
 * @returns Array of file objects atau null jika gagal
 */
export async function listImages(folder?: string) {
    try {
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .list(folder || '', {
                limit: 100,
                sortBy: { column: 'created_at', order: 'desc' }
            })

        if (error) {
            console.error('Error listing images:', error.message)
            return null
        }

        return data
    } catch (error) {
        console.error('Error listing images:', error)
        return null
    }
}

/**
 * Extract path dari URL Supabase Storage
 * @param url - URL publik gambar
 * @returns path gambar atau null
 */
function extractPathFromUrl(url: string): string | null {
    try {
        // Jika sudah berupa path (bukan URL), return langsung
        if (!url.startsWith('http')) {
            return url
        }

        // URL format: https://xxx.supabase.co/storage/v1/object/public/images/path/to/file.jpg
        const regex = new RegExp(`/storage/v1/object/public/${BUCKET_NAME}/(.+)$`)
        const match = url.match(regex)
        
        return match ? match[1] : null
    } catch {
        return null
    }
}

/**
 * Update gambar (hapus yang lama, upload yang baru)
 * @param oldImageUrl - URL gambar lama yang akan dihapus
 * @param newFile - File gambar baru
 * @param folder - Folder tujuan (opsional)
 * @returns URL publik gambar baru atau null jika gagal
 */
export async function updateImage(
    oldImageUrl: string | null, 
    newFile: File, 
    folder?: string
): Promise<string | null> {
    // Hapus gambar lama jika ada
    if (oldImageUrl) {
        await deleteImage(oldImageUrl)
    }

    // Upload gambar baru
    return uploadImage(newFile, folder)
}
