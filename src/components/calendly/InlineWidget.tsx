import { useEffect } from "react";

interface CalendlyInlineWidgetProps {
  data_url: string;
  height?: string;
  maxWidth?: string;
  marginTop?: string;
}

const CalendlyInlineWidget = ({
  data_url,
  height = "700px",
  maxWidth = "100%",
  marginTop = "0px",
}: CalendlyInlineWidgetProps) => {
  const calendlyWidgetStyle: React.CSSProperties = {
    minWidth: "320px",
    maxWidth: maxWidth,
    width: "100%",
    height: height,
    maxHeight: "100%",
    marginTop: marginTop,
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
