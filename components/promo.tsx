"use client";

import { useCallback, useState, type FC } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

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
  return (
    <div className="animate-fade-in w-11/12 max-w-[320px] fixed top-auto bottom-3 right-3 2xl:top-3 2xl:bottom-auto 2xl:right-3 rounded-lg border-2 border-emerald-700/50 bg-card text-card-foreground shadow-sm px-4 py-3">
      <h1 className="font-medium text-sm text-emerald-900">
        Looking for a Trophy Hunt Backlog app?
      </h1>
      <div className="flex gap-2 flex-wrap mt-1">
        <Button className={styles.button} asChild>
          <a href="https://trophy-hunt-template.vercel.app/" target="_blank">
            Visit Website
          </a>
        </Button>
        <Button className={styles.button} onClick={openVideo}>
          Watch Promo
        </Button>
      </div>
      <Button
        variant="link"
        className="text-xs text-emerald-900 h-auto p-0 mt-2"
        onClick={hidePromo}>
        Don&apos;t show this again
      </Button>
    </div>
  );
};

const Video: FC<VideoProps> = (props) => {
  const { closeVideo } = props;
  return (
    <div className="fixed animate-fade-in inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full h-full flex justify-center items-center">
        <Button
          unstyled
          className="absolute top-4 right-4 text-white z-50"
          onClick={closeVideo}>
          <XIcon />
        </Button>
        <iframe
          className="animate-fade-in w-[90vw] h-auto md:w-auto md:h-[90vh] aspect-video"
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
    key: "plat-cal-promo",
    defaultValue: true,
  });

  const handleOpenVideo = useCallback(() => {
    setVideoOpen(true);
  }, [setVideoOpen]);

  const handleCloseVideo = useCallback(() => {
    setVideoOpen(false);
  }, [setVideoOpen]);

  const hidePromo = useCallback(() => {
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
