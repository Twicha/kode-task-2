export const useScroll = () => {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return {scrollTop}
}