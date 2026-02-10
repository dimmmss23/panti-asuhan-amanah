import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const galleryDir = path.join(process.cwd(), 'public', 'komponenGaleri');

        // Ensure directory exists
        if (!fs.existsSync(galleryDir)) {
            return NextResponse.json({ images: [] });
        }

        const files = fs.readdirSync(galleryDir);

        // Filter for image files
        const imageFiles = files.filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );

        // Sort naturally (numeric) so 1.jpg, 2.jpg... 10.jpg come in order
        imageFiles.sort((a, b) => {
            return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        });

        // Map to public URL paths
        const imagePaths = imageFiles.map(file => `/komponenGaleri/${file}`);

        return NextResponse.json({ images: imagePaths });
    } catch (error) {
        console.error('Error reading gallery directory:', error);
        return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
    }
}
