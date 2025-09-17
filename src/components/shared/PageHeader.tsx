import { JSX } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: JSX.Element;
}

const PageHeader = ({ title, subtitle, rightContent }: PageHeaderProps): JSX.Element => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      {rightContent && <div className="mt-4 sm:mt-0">{rightContent}</div>}
    </div>
  );
};

export default PageHeader;
