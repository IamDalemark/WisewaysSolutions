import type { Meta, StoryObj } from "@storybook/react";
import CalendlyInlineWidget from "@/components/calendly/InlineWidget";

const meta: Meta<typeof CalendlyInlineWidget> = {
  title: "Components/Calendly/CalendlyInlineWidget",
  component: CalendlyInlineWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The `CalendlyInlineWidget` embeds a Calendly scheduling iframe directly into your app. You must pass a valid `data_url` to configure the widget with a specific Calendly event type.",
      },
    },
  },
  argTypes: {
    data_url: {
      control: "text",
      description:
        "Calendly event scheduling URL. Must be a valid Calendly `data-url` (e.g., https://calendly.com/yourname/30min).",
    },
    height: {
      control: "text",
      description:
        "Height of the Calendly widget iframe (default is `700px`). Use valid CSS values like `700px` or `100%`.",
    },
    maxWidth: {
      control: "text",
      description:
        "Maximum width of the Calendly iframe container (default is `100%`).",
    },
    marginTop: {
      control: "text",
      description:
        "Top margin applied to the widget (default is `0px`). Can be used to space it from other content.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CalendlyInlineWidget>;

export const Default: Story = {
  args: {
    data_url:
      "https://calendly.com/francyamada1983/30min?back=1&hide_gdpr_banner=1",
    height: "700px",
    maxWidth: "100%",
    marginTop: "0px",
  },
};

export const CustomSize: Story = {
  args: {
    data_url:
      "https://calendly.com/francyamada1983/30min?back=1&hide_gdpr_banner=1",
    height: "500px",
    maxWidth: "600px",
    marginTop: "24px",
  },
};
