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

const styles = {
  trigger: "text-left text-sm",
  heading: "text-center font-medium mt-4",
  group: "flex flex-col gap-y-2",
  content: "text-sm",
  link: "font-bold",
};

const HelpTab: FC = () => {
  return (
    <TabsContent value="help">
      <Accordion type="single" collapsible>
        <AccordionItem value="fetch-error">
          <AccordionTrigger className={styles.trigger}>
            I got the error &apos;Unable to fetch platinums data&apos;. What
            happened?
          </AccordionTrigger>
          <AccordionContent>
            <b>The fetch source Alpha</b> (which can be changed in the settings)
            may not work with profiles that have 1000+ platinum trophies. Try
            changing the fetch source in the settings and give it another shot.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="legend">
          <AccordionTrigger className={styles.trigger}>
            What do the numbers and circles on the right side mean?
          </AccordionTrigger>
          <AccordionContent>
            That&apos;s <b>a legend</b>, indicating which color corresponds to
            the number of platinum trophies.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="outdated-data">
          <AccordionTrigger className={styles.trigger}>
            I see outdated data in the calendar.
          </AccordionTrigger>
          <AccordionContent>
            This likely happens because you <b>haven&apos;t updated</b> your
            profile on PSNProfiles. To view the most up-to-date data, make sure
            your profile is updated on PSNProfiles.
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
      <h1 className={cn(styles.heading, "mb-2")}>Special Thanks</h1>
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
      <h1 className={cn(styles.heading, "mb-2")}>Happy hunting!</h1>
    </TabsContent>
  );
};

const AboutModal: FC<ModalProps> = (props) => {
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

export default AboutModal;
