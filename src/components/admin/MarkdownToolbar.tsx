"use client";

import {
  Bold,
  Code,
  Eye,
  EyeOff,
  FileCode2,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListTodo,
  Quote,
} from "lucide-react";
import type { ReactNode } from "react";
import type { MarkdownCommand } from "@/lib/admin/markdown-editor";

const toolbarItems: Array<{
  command: MarkdownCommand;
  label: string;
  icon: ReactNode;
}> = [
  { command: "h2", label: "H2", icon: <Heading2 size={24} /> },
  { command: "h3", label: "H3", icon: <Heading3 size={24} /> },
  { command: "bold", label: "粗体", icon: <Bold size={24} /> },
  { command: "italic", label: "斜体", icon: <Italic size={24} /> },
  { command: "quote", label: "引用", icon: <Quote size={24} /> },
  { command: "inline-code", label: "代码", icon: <Code size={24} /> },
  { command: "code-block", label: "代码块", icon: <FileCode2 size={24} /> },
  { command: "bulleted-list", label: "列表", icon: <List size={24} /> },
  { command: "todo-list", label: "待办", icon: <ListTodo size={24} /> },
  { command: "link", label: "链接", icon: <Link2 size={24} /> },
];

export function MarkdownToolbar(props: {
  onCommand: (command: MarkdownCommand) => void;
  onUploadImage: () => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  isPreviewOpen?: boolean;
  onTogglePreview?: () => void;
}) {
  const orientation = props.orientation ?? "horizontal";
  const isVertical = orientation === "vertical";

  const containerClasses = isVertical
    ? "editor-toolbar-rail"
    : "flex gap-2 overflow-x-auto pb-1";

  const buttonClasses = isVertical
    ? "editor-toolbar-button editor-toolbar-rail-button"
    : "editor-toolbar-button shrink-0";

  return (
    <div className={containerClasses}>
      {toolbarItems.map((item) => (
        <div key={item.command} className="relative group/tooltip">
          <button
            type="button"
            className={buttonClasses}
            onClick={() => props.onCommand(item.command)}
            disabled={props.disabled}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
            {!isVertical ? <span>{item.label}</span> : null}
          </button>
          {isVertical ? <span className="tooltip-custom left-full top-1/2 ml-2 -translate-y-1/2 origin-left">{item.label}</span> : null}
        </div>
      ))}

      <div className="relative group/tooltip">
        <button
          type="button"
          className={buttonClasses}
          onClick={props.onUploadImage}
          disabled={props.disabled}
          aria-label="上传图片"
          title="上传图片"
        >
          <ImagePlus size={24} />
          {!isVertical ? <span>图片</span> : null}
        </button>
        {isVertical ? <span className="tooltip-custom left-full top-1/2 ml-2 -translate-y-1/2 origin-left">上传图片</span> : null}
      </div>

      {props.onTogglePreview ? (
        <div className={`relative group/tooltip ${isVertical ? "border-t border-white/40 pt-2" : "border-l border-white/40 pl-2 ml-1"}`}>
          <button
            type="button"
            className={`${buttonClasses} ${props.isPreviewOpen ? "border-accent bg-accent-soft text-accent-strong hover:bg-accent-soft/80" : ""}`}
            onClick={props.onTogglePreview}
            disabled={props.disabled}
            aria-label={props.isPreviewOpen ? "关闭预览" : "打开预览"}
            title={props.isPreviewOpen ? "关闭预览" : "打开预览"}
          >
            {props.isPreviewOpen ? <EyeOff size={24} /> : <Eye size={24} />}
            {!isVertical ? <span>{props.isPreviewOpen ? "关闭预览" : "预览"}</span> : null}
          </button>
          {isVertical ? (
            <span className="tooltip-custom left-full top-1/2 ml-2 -translate-y-1/2 origin-left">
              {props.isPreviewOpen ? "关闭预览" : "打开预览"}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
