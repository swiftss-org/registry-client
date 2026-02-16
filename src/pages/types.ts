export type ResponsiveProps = {
  isSmallDesktop: boolean;
  isMediumDesktop: boolean;
  isLargeDesktop: boolean;
  isXLargeDesktop: boolean;
  isExpanded?: boolean;
};

export interface FilterOption {
  label: string;
  value: string | number;
}