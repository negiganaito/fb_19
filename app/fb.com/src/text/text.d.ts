export interface FDSTextPairingProps {
  body?: React.ReactNode;
  bodyColor?: string;
  bodyId?: string;
  bodyLineLimit?: number;
  bodyRef?: React.Ref<any>;
  bodyTruncationTooltip?: React.ReactNode;
  dir?: 'auto' | 'ltr' | 'rtl';
  headline?: React.ReactNode;
  headlineAddOn?: React.ReactNode;
  headlineColor?: string;
  headlineId?: string;
  headlineLineLimit?: number;
  headlineRef?: React.Ref<any>;
  headlineTruncationTooltip?: React.ReactNode;
  isPrimaryHeading?: boolean;
  isSemanticHeading?: boolean;
  level?: 1 | 2 | 3 | 4 | 'entityHeader1' | 'entityHeader2';
  meta?: React.ReactNode;
  metaColor?: string;
  metaLineLimit?: number;
  metaLocation?: 'above' | 'below';
  metaRef?: React.Ref<any>;
  metaTestID?: string;
  metaTruncationTooltip?: React.ReactNode;
  reduceEmphasis?: boolean;
  testid?: string;
  textAlign?: 'start' | 'center' | 'end';
}

export interface CometHeadlineWithAddOnPropTypes {
  color?: string; // TODO
  id?: string;
  headlineRef?: FDSTextPairingProps['headlineRef'];
  addOn?: React.ReactNode;
  children?: React.ReactNode;
  isPrimaryHeading?: FDSTextPairingProps['isPrimaryHeading'];
  isSemanticHeading?: FDSTextPairingProps['isSemanticHeading'];
  numberOfLines?: number;
  truncationTooltip?: any;
  type?: any;
}
