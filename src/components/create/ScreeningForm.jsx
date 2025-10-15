import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";
import InputField from "./InputField";

export default function ScreeningForm({ form }) {
  return (
    <>
      {/* screening */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Screening Setup
          </CardTitle>
          <CardDescription>
            Configure how you'll screen and select respondents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* <FormField
      control={form.control}
      name="screeningDescription"
      render={({ field }) => (
       <FormItem>
        <FormLabel>Screening Description *</FormLabel>
        <FormControl>
         <Textarea
          placeholder="Describe the screening process"
          className="resize-none"
          {...field}
         />
        </FormControl>

        <FormMessage />
       </FormItem>
      )}
     /> */}
          <InputField
            form={form}
            formFieldName="screeningDescription"
            formLabel="Screening Description *"
            placeholder="Describe the screening process"
          />

          {/* <FormField
            control={form.control}
            name="screeningRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List any requirements (e.g., age, location, experience)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <InputField
            form={form}
            formFieldName="screeningRequirements"
            formLabel="Requirements *"
            placeholder="List any requirements (e.g., age, location, experience)"
          />

          <FormField
            control={form.control}
            name="screeningDateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Screening Date & Time</FormLabel>
                <FormControl>
                  <SmartDatetimeInput
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="e.g. Tomorrow morning 9am"
                    hour12
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="meetingLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Link</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://zoom.us/..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <InputField
            form={form}
            formFieldName="meetingLink"
            formLabel="Meeting Link *"
            placeholder="https://zoom.us/..."
          />

          {/* <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main St, City, Country"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <InputField
            form={form}
            formFieldName="location"
            formLabel="Physical Location"
            placeholder="123 Main St, City, Country"
          />
        </CardContent>
      </Card>

      {/* screening date and time */}
      <FormField
        control={form.control}
        name="screeningDateTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Screening Date & Time</FormLabel>
            <FormControl>
              <SmartDatetimeInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="e.g. Tomorrow morning 9am"
                hour12
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* survey finalize date */}
      <FormField
        control={form.control}
        name="surveyFinalizeDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Survey Finalize Date</FormLabel>
            <FormControl>
              <SmartDatetimeInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="e.g. Tomorrow morning 9am"
                hour12
              />
            </FormControl>
            <FormDescription>
              The date and time when the survey automatically finalizes and
              distributes ETH rewards to all respondents.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
