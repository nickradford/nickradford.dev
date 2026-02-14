import { fields } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";

type KeystaticImageGalleryProps = {
  value: {
    images: readonly {
      url: string;
      altText: string;
    }[];
  };
};
// Renders the images inside the editor for you
export function KeystaticImageGallery({ value }: KeystaticImageGalleryProps) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {value.images.map(({ url, altText }) => (
        <img
          src={url}
          style={{ maxWidth: 100, borderRadius: 12 }}
          alt={altText}
        />
      ))}
    </div>
  );
}

// Adds an ImageGallery component to the menu bar
export const ImageGallery = block({
  label: "Image Gallery",
  schema: {
    title: fields.text({ label: "Title", validation: { isRequired: true } }),
    images: fields.array(
      fields.object({
        url: fields.text({ label: "url" }),
        altText: fields.text({
          label: "alt text",
          description: "Used in the gallery",
        }),
      })
    ),
  },
  ContentView: KeystaticImageGallery,
  description: "A responsive image gallery powered by Swiper.js",
});
