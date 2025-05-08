import { useEffect } from "react";

interface CalendlyInlineWidgetProps {
  data_url: string;
}

const CalendlyInlineWidget = ({ data_url }: CalendlyInlineWidgetProps) => {
  const calendlyWidgetStyle: React.CSSProperties = {
    minWidth: "320px",
    height: "700px",
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.getElementById("calendly-widget")!.appendChild(script);
  }, []);

  return (
    <div
      id="calendly-widget"
      className="calendly-inline-widget"
      data-url={data_url}
      style={calendlyWidgetStyle}
    ></div>
  );
};

export default CalendlyInlineWidget;
