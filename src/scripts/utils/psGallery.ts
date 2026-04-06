export function psGallery() {
    return {
        photos: [] as string[],
        activeIndex: 0,
        activeImage: null as string | null,
        init() { this.scrollToActive(); },

        setPhotos(newPhotos: string[]) {
            this.photos = newPhotos || [];
            this.activeIndex = 0;
        },

        prev() {
            if (this.activeIndex > 0) {
                this.activeIndex--;
                this.scrollToActive();
            }
        },
        next() {
            if (!this.photos || this.photos.length === 0) return;

            if (this.activeIndex < this.photos.length - 1) {
                this.activeIndex++;
                this.scrollToActive();
            }
        },

        scrollToActive() {
            const track = document.querySelector('.gallery-track');
            if (!track) return;

            const width = track.clientWidth;

            track.scrollTo({
                left: this.activeIndex * width,
                behavior: "smooth"
            });
        },

        openModal(img: string) {
            this.activeImage = img;
        },
        closeModal() {
            this.activeImage = '';
        }
    }
}