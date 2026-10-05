import React from 'react';
import { ProfileImage as ProfileImageData } from '../../types';

interface ProfileImageProps {
  image: ProfileImageData;
  sizes: string;
  priority?: boolean; // main portrait on a page: load first, never lazily
  className?: string;
}

/**
 * A person's portrait: responsive WebP (descriptive file name, fixed width/height so nothing
 * shifts) with the alt text built in scripts/people.cjs, i.e. name, role and studio. The same
 * image URL is used in the page, in og:image, in the structured data and in the image sitemap.
 */
const ProfileImage: React.FC<ProfileImageProps> = ({ image, sizes, priority = false, className }) => (
  <img
    src={image.src}
    srcSet={image.srcSet}
    sizes={sizes}
    width={image.width}
    height={image.height}
    alt={image.alt}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : undefined}
    decoding="async"
    className={className}
  />
);

export default ProfileImage;
