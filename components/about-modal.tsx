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

const styles = {
  trigger: "text-left text-sm",
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
      <pre>Hello World</pre>
    </TabsContent>
  );
};

const AboutModal: FC<ModalProps> = (props) => {
  const { isVisible, onClose } = props;
  return (
    <Modal description="About modal" isVisible={isVisible} onClose={onClose}>
      <Tabs defaultValue="help" className="mt-4">
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
