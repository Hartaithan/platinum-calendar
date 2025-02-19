"use client";

import type { FC } from "react";
import { Modal } from "@/components/ui/modal";
import type { ModalProps } from "@/components/ui/modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/styles";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import { CircleHelpIcon } from "lucide-react";

const styles = {
  trigger: "text-left text-sm pr-2",
  heading: "text-center font-medium",
  group: "flex flex-col gap-y-2",
  content: "text-sm",
  link: "font-bold",
};

const HelpTab: FC = () => {
  return (
    <TabsContent
      value="help"
      className="w-full-scrollbar-base flex flex-col gap-3 max-h-[80vh] overflow-y-auto overflow-x-hidden scrollbar-gutter">
      <Accordion type="multiple">
        <AccordionItem value="ps-account">
          <AccordionTrigger className={styles.trigger}>
            Do I need a PlayStation account to use this app?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you need a PlayStation account. Additionally,&nbsp;
            <b>you must be registered on PSNProfiles</b>, as the app pulls data
            from there
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="artifacts">
          <AccordionTrigger className={styles.trigger}>
            The generated image contains artifacts. How can I fix this?
          </AccordionTrigger>
          <AccordionContent>
            This can happen if you&apos;re using an <b>mobile browser</b>. Try
            generating the image again from desktop mode, and if the issue
            persists, feel free to email me at&nbsp;
            <a
              className={styles.link}
              href="mailto:hartaithan@gmail.com"
              target="_blank">
              hartaithan@gmail.com
            </a>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="outdated-data">
          <AccordionTrigger className={styles.trigger}>
            I see outdated data in the calendar
          </AccordionTrigger>
          <AccordionContent>
            <b>This may happen for two reasons:</b>
            <br />
            <b>Cache</b>: to check if the data is loaded from the cache, look
            for a notification after receiving the data
            <br />
            <b>Outdated profile on PSNProfiles</b>: make sure your profile is
            synchronized on PSNProfiles to see the most up-to-date data.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="legend">
          <AccordionTrigger className={styles.trigger}>
            What do the numbers and circles on the right side mean?
          </AccordionTrigger>
          <AccordionContent>
            That&apos;s <b>a legend</b>, indicating which color corresponds to
            the number of platinum trophies
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="wrong-dates">
          <AccordionTrigger className={styles.trigger}>
            I noticed incorrect dates in the calendar
          </AccordionTrigger>
          <AccordionContent>
            Since the calendar is generated on <b>the client side</b>, the dates
            are formatted based on your system settings. Please&nbsp;
            <b>ensure that the correct time zone</b> is set on your device
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="non-platinum">
          <AccordionTrigger className={styles.trigger}>
            Can I track 100% completions with this app?
          </AccordionTrigger>
          <AccordionContent>
            No, this app <b>only tracks platinum trophies</b>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="report">
          <AccordionTrigger className={styles.trigger}>
            I found a bug or issue. How do I report it?
          </AccordionTrigger>
          <AccordionContent>
            You can contact me via Discord <b>@hartaithan</b> or by email
            at&nbsp;
            <a
              className={styles.link}
              href="mailto:hartaithan@gmail.com"
              target="_blank">
              hartaithan@gmail.com
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TabsContent>
  );
};

const AboutTab: FC = () => {
  return (
    <TabsContent value="about">
      <h1 className={styles.heading}>About</h1>
      <div className={styles.group}>
        <p className={cn(styles.content, "mt-2")}>
          This web app allows you to visualize your progress by&nbsp;
          <b>generating a custom calendar</b> that displays the exact days you
          earned your platinum trophies throughout the year
        </p>
        <p className={styles.content}>
          <b>Track</b> how many platinum trophies you&apos;ve collected day by
          day, and <b>watch</b> your calendar fill up as you progress toward
          completing it
        </p>
        <p className={styles.content}>
          Whether you&apos;re aiming for <b>a full year of platinum trophies</b>
          &nbsp;or just want to review your trophy milestones, this app helps
          you stay motivated on your journey to trophy mastery
        </p>
      </div>
      <h1 className={cn(styles.heading, "mt-4 mb-2")}>Special Thanks</h1>
      <ul>
        <li className={styles.content}>
          <a
            className={styles.link}
            href="https://www.reddit.com/user/Colinaaron250/"
            target="_blank">
            Colinaaron250
          </a>
          &nbsp;- for providing the fantastic idea
        </li>
        <li className={styles.content}>
          <a
            className={styles.link}
            href="https://github.com/TheYuriG/"
            target="_blank">
            TheYuriG
          </a>
          &nbsp;- for valuable feedback
        </li>
        <li className={styles.content}>
          <b>Han_the_Dragon, disorderly</b> - for assistance with testing
        </li>
      </ul>
      <h1 className={cn(styles.heading, "mt-4 mb-2")}>Happy hunting!</h1>
    </TabsContent>
  );
};

const Content: FC<ModalProps> = (props) => {
  const { isVisible, onClose } = props;
  return (
    <Modal
      title="Platinum Calendar"
      description="About modal"
      isVisible={isVisible}
      onClose={onClose}>
      <Tabs defaultValue="help">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="help">Help</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <HelpTab />
        <AboutTab />
      </Tabs>
    </Modal>
  );
};

const AboutModal: FC = () => {
  const [about, openAbout, closeAbout] = useModal();
  return (
    <>
      <Content isVisible={about.isVisible} onClose={closeAbout} />
      <Button
        id="about-modal"
        variant="secondary"
        aria-label="Open about modal"
        className="border border-input"
        onClick={openAbout}>
        <CircleHelpIcon className="size-5 stroke-[1.5]" />
      </Button>
    </>
  );
};

export default AboutModal;
