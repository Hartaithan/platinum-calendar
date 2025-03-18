"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { ModalProps } from "@/components/ui/modal";
import { Modal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/utils/styles";
import { CircleHelpIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, FC } from "react";

const styles = {
  trigger: "text-left text-sm pr-2",
  heading: "text-center font-medium",
  group: "flex flex-col gap-y-2",
  content: "text-sm",
  link: "font-bold",
};

const AboutLink: FC<ComponentPropsWithoutRef<"a">> = (props) => {
  const { children, className, target = "_blank", ...rest } = props;
  return (
    <a className={cn(className, styles.link)} target={target} {...rest}>
      {children}
    </a>
  );
};

const HelpTab: FC = () => {
  return (
    <TabsContent
      value="help"
      className="w-full-scrollbar-base scrollbar-gutter flex max-h-[80vh] flex-col gap-3 overflow-y-auto overflow-x-hidden">
      <Accordion type="multiple">
        <AccordionItem value="ps-account">
          <AccordionTrigger className={styles.trigger}>
            Do I need a PlayStation account to use this app?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you need a PlayStation account. Additionally,&nbsp;
            <b>your PSN account must be set to public</b> so your trophy data
            can be accessed
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
            <AboutLink href="mailto:hartaithan@gmail.com">
              hartaithan@gmail.com
            </AboutLink>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="outdated-data">
          <AccordionTrigger className={styles.trigger}>
            I see outdated data in the calendar
          </AccordionTrigger>
          <AccordionContent>
            Outdated data can appear if you&apos;re seeing&nbsp;
            <b>cached response</b>. You&apos;re notified about this right after
            the data is retrieved. The data is <b>cached for 1 day</b>, so the
            most up-to-date data&nbsp;
            <b>will only be available after 24 hours</b>
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
            <b>Yes, you can</b>! Tracking 100% completions is supported, and you
            can enable this feature <b>in the settings</b>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="report">
          <AccordionTrigger className={styles.trigger}>
            I found a bug or issue. How do I report it?
          </AccordionTrigger>
          <AccordionContent>
            You can contact me via Discord <b>@hartaithan</b> or by email
            at&nbsp;
            <AboutLink href="mailto:hartaithan@gmail.com">
              hartaithan@gmail.com
            </AboutLink>
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
      <h1 className={cn(styles.heading, "mb-2 mt-4")}>Special Thanks</h1>
      <ul>
        <li className={styles.content}>
          <AboutLink href="https://www.reddit.com/user/Colinaaron250">
            Colinaaron250
          </AboutLink>
          &nbsp;- for providing the fantastic&nbsp;
          <AboutLink href="https://www.reddit.com/r/Trophies/comments/1bszyil/other_i_recently_got_my_365th_platinum_trophy">
            idea
          </AboutLink>
        </li>
        <li className={styles.content}>
          <AboutLink href="https://github.com/TheYuriG">TheYuriG</AboutLink>
          ,&nbsp;
          <AboutLink href="https://psnprofiles.com/Copanele">
            Copanele
          </AboutLink>
          ,&nbsp;
          <AboutLink href="https://psnprofiles.com/Deceptrox">
            Deceptrox
          </AboutLink>
          ,&nbsp;
          <AboutLink href="https://psnprofiles.com/Evil_Joker88">
            Evil_Joker88
          </AboutLink>
          &nbsp;- for valuable feedback
        </li>
        <li className={styles.content}>
          <AboutLink href="https://psnprofiles.com/Han_the_Dragon">
            Han_the_Dragon
          </AboutLink>
          ,&nbsp;
          <AboutLink href="https://psnprofiles.com/IIFraxx">IIFraxx</AboutLink>
          &nbsp;- for assistance with testing
        </li>
      </ul>
      <h1 className={cn(styles.heading, "mb-2 mt-4")}>Happy hunting!</h1>
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
