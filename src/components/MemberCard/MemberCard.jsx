import { useState } from 'react';

import * as S from './MemberCard.styled';

const MemberCard = () => {
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  const handleEmailHover = () => setIsEmailHovered((prevState) => !prevState);

  return (
    <S.MemberCardContainer>
      <S.ProfileImageFrame>
        <S.ProfileImage src="Alex Kim.jpg" alt="Alex Kim" />
      </S.ProfileImageFrame>
      <S.MemberInfo>
        <S.MemberName>Alex Kim</S.MemberName>
        <S.Divider />
        <S.MemberMajor>Interaction/UX</S.MemberMajor>
        <S.MemberEmail
          $emailHovered={isEmailHovered}
          onMouseEnter={handleEmailHover}
          onMouseLeave={handleEmailHover}
          href="mailto: keaikim77@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          keaikim77@gmail.com
        </S.MemberEmail>
      </S.MemberInfo>
    </S.MemberCardContainer>
  );
};

export default MemberCard;
