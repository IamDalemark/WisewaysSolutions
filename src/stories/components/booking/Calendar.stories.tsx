import type { Meta, StoryObj } from "@storybook/react";
import CalendarComponent from "@/components/booking/Calendar";

const meta: Meta<typeof CalendarComponent> = {
  title: "Components/Booking/CalendarComponent",
  component: CalendarComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A clean, minimal calendar component that displays a month view with today highlighted in green.",
      },
    },
  },
  argTypes: {
    currentDate: {
      control: "date",
      description: "The date to display in the calendar",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default calendar showing the current month with today highlighted.",
      },
    },
  },
};

export const January2024: Story = {
  args: {
    currentDate: new Date(2024, 0, 15), // January 15, 2024
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar showing January 2024, demonstrating a month that starts on a Monday.",
      },
    },
  },
};

export const February2024LeapYear: Story = {
  args: {
    currentDate: new Date(2024, 1, 14), // February 14, 2024
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar showing February 2024 (leap year) with 29 days, demonstrating leap year handling.",
      },
    },
  },
};

export const February2023NonLeapYear: Story = {
  args: {
    currentDate: new Date(2023, 1, 20), // February 20, 2023
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar showing February 2023 (non-leap year) with 28 days.",
      },
    },
  },
};

export const March2024: Story = {
  args: {
    currentDate: new Date(2024, 2, 10), // March 10, 2024
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar showing March 2024, demonstrating a month that starts on a Friday.",
      },
    },
  },
};

export const December2024: Story = {
  args: {
    currentDate: new Date(2024, 11, 25), // December 25, 2024
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar showing December 2024, demonstrating a month that starts on a Sunday with no empty cells at the beginning.",
      },
    },
  },
};

export const FirstDayHighlighted: Story = {
  args: {
    currentDate: new Date(2024, 5, 1), // June 1, 2024
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar with the first day of the month highlighted as 'today'.",
      },
    },
  },
};

export const LastDayHighlighted: Story = {
  args: {
    currentDate: new Date(2024, 6, 31), // July 31, 2024
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar with the last day of the month (31st) highlighted as 'today'.",
      },
    },
  },
};

export const April2024ThirtyDays: Story = {
  args: {
    currentDate: new Date(2024, 3, 15), // April 15, 2024
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar showing April 2024, demonstrating a 30-day month.",
      },
    },
  },
};

export const September2024StartingSunday: Story = {
  args: {
    currentDate: new Date(2024, 8, 20), // September 20, 2024
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar showing September 2024, which starts on a Sunday, filling the entire first row.",
      },
    },
  },
};

export const LongMonthName: Story = {
  args: {
    currentDate: new Date(2024, 8, 5), // September 5, 2024
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar showing September, demonstrating how longer month names are displayed.",
      },
    },
  },
};

export const YearTransition: Story = {
  args: {
    currentDate: new Date(2023, 11, 31), // December 31, 2023
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar showing December 2023, useful for testing year transitions.",
      },
    },
  },
};

export const MidWeekStart: Story = {
  args: {
    currentDate: new Date(2024, 4, 15), // May 15, 2024 (May starts on Wednesday)
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar showing May 2024, which starts on a Wednesday, demonstrating mid-week month starts.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    currentDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test the calendar with different dates. Use the date control to explore different months and years.",
      },
    },
  },
};
