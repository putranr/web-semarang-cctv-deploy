import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

import {
  Transform,
} from 'class-transformer';

export class CreateBusinessPartnerDto {
  // =====================================================
  // STATUS PUBLISH
  // =====================================================

  @IsOptional()
  @Transform(
    ({ value }) =>
      value === true ||
      value === 'true',
  )
  @IsBoolean()
  isPublished?: boolean;
}