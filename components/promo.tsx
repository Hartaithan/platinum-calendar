"use client";

import { Button } from "@/components/ui/button";
import { promoKey } from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { XIcon } from "lucide-react";
import posthog from "posthog-js";
import { useCallback, useState, type FC } from "react";

interface ContentProps {
  openVideo: () => void;
  hidePromo: () => void;
}

interface VideoProps {
  closeVideo: () => void;
}

const styles = {
  button: "h-6 text-xs py-1 bg-emerald-700 hover:bg-emerald-800",
};

const sandbox = "allow-scripts allow-same-origin allow-presentation";

const Content: FC<ContentProps> = (props) => {
  const { openVideo, hidePromo } = props;

  const handleLink = useCallback(() => {
    posthog.capture("promo-link-click");
  }, []);

  return (
    <div className="fixed bottom-3 right-3 top-auto w-11/12 max-w-[320px] animate-fade-in rounded-lg border-2 border-emerald-700/50 bg-card px-4 py-3 text-card-foreground shadow-sm 2xl:bottom-auto 2xl:right-3 2xl:top-3">
      <h1 className="text-sm font-medium text-emerald-900">
        Looking for a Trophy Hunt Backlog app?
      </h1>
      <div className="mt-1 flex flex-wrap gap-2">
        <Button className={styles.button} asChild>
          <a
            href="https://trophy-hunt-template.vercel.app/"
            target="_blank"
            onClick={handleLink}>
            Visit Website
          </a>
        </Button>
        <Button className={styles.button} onClick={openVideo}>
          Watch Promo
        </Button>
      </div>
      <Button
        variant="link"
        className="mt-2 h-auto p-0 text-xs text-emerald-900"
        onClick={hidePromo}>
        Don&apos;t show this again
      </Button>
    </div>
  );
};

const Video: FC<VideoProps> = (props) => {
  const { closeVideo } = props;
  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black bg-opacity-90">
      <div className="relative flex h-full w-full items-center justify-center">
        <Button
          unstyled
          className="absolute right-4 top-4 z-50 text-white"
          onClick={closeVideo}>
          <XIcon />
        </Button>
        <iframe
          className="aspect-video h-auto w-[90vw] animate-fade-in md:h-[90vh] md:w-auto"
          src="https://www.youtube.com/embed/YMm_rRa7qjk"
          title="Trophy Hunt Template Promo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox={sandbox}
        />
      </div>
    </div>
  );
};

const Promo: FC = () => {
  const [isVideoOpen, setVideoOpen] = useState(false);
  const [isPromoVisible, setPromoVisible] = useLocalStorage({
    key: promoKey,
    defaultValue: true,
  });

  const handleOpenVideo = useCallback(() => {
    posthog.capture("promo-video-open");
    setVideoOpen(true);
  }, [setVideoOpen]);

  const handleCloseVideo = useCallback(() => {
    posthog.capture("promo-video-close");
    setVideoOpen(false);
  }, [setVideoOpen]);

  const hidePromo = useCallback(() => {
    posthog.capture("promo-hide");
    setPromoVisible(false);
  }, [setPromoVisible]);

  if (!isPromoVisible) return null;

  return (
    <>
      <Content openVideo={handleOpenVideo} hidePromo={hidePromo} />
      {isVideoOpen && <Video closeVideo={handleCloseVideo} />}
    </>
  );
};

export default Promo;
