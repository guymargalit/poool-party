import React from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  font-size: 24px;
  padding: 10px 15px;
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  font-size: 18px;
`;

const Text = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.text.primary};
  font-size: 14px;
`;

const Privacy = ({ darkMode, setDarkMode }) => {
  return (
    <Page
      heading={<Title>Privacy Policy</Title>}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >
      <Text>
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you visit or make a purchase from
        https://poool.party (the “Site”).
      </Text>
      <Subtitle>PERSONAL INFORMATION WE COLLECT</Subtitle>

      <Text>
        When you visit the Site, we automatically collect certain information
        about your device, including information about your web browser, IP
        address, time zone, and some of the cookies that are installed on your
        device. Additionally, as you browse the Site, we collect information
        about the individual web pages or products that you view, what websites
        or search terms referred you to the Site, and information about how you
        interact with the Site. We refer to this automatically-collected
        information as “Device Information.”
      </Text>
      <Text>
        We collect Device Information using the following technologies:
      </Text>
      <ul>
        <li>
          <Text>
            “Cookies” are data files that are placed on your device or computer
            and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit
            http://www.allaboutcookies.org.
          </Text>
        </li>
        <li>
          <Text>
            “Log files” track actions occurring on the Site, and collect data
            including your IP address, browser type, Internet service provider,
            referring/exit pages, and date/time stamps.
          </Text>
        </li>
        <li>
          <Text>
            “Web beacons,” “tags,” and “pixels” are electronic files used to
            record information about how you browse the Site.
          </Text>
        </li>
      </ul>

      <Text>
        When we talk about “Personal Information” in this Privacy Policy, we are
        talking both about Device Information and Order Information.
      </Text>

      <Subtitle>SHARING YOUR PERSONAL INFORMATION</Subtitle>

      <Text>
        We share your Personal Information with third parties to help us use
        your Personal Information, as described above. You can also opt-out of
        Google Analytics here: https://tools.google.com/dlpage/gaoptout.
      </Text>

      <Text>
        Finally, we may also share your Personal Information to comply with
        applicable laws and regulations, to respond to a subpoena, search
        warrant or other lawful request for information we receive, or to
        otherwise protect our rights.
      </Text>
      <Text>
        Additionally, you can opt out of some of these services by visiting the
        Digital Advertising Alliance’s opt-out portal at:
        http://optout.aboutads.info/.
      </Text>
      <Subtitle>DO NOT TRACK</Subtitle>

      <Text>
        Please note that we do not alter our Site’s data collection and use
        practices when we see a Do Not Track signal from your browser.
      </Text>

      <Subtitle>DATA RETENTION</Subtitle>

      <Text>
        When you place an order through the Site, we will maintain your Order
        Information for our records unless and until you ask us to delete this
        information.
      </Text>

      <Subtitle>MINORS</Subtitle>

      <Text>The Site is not intended for individuals under the age of 18.</Text>

      <Subtitle>CHANGES</Subtitle>
      <Text>
        We may update this privacy policy from time to time in order to reflect,
        for example, changes to our practices or for other operational, legal or
        regulatory reasons.
      </Text>
      <Subtitle>CONTACT US</Subtitle>
      <Text>
        For more information about our privacy practices, if you have questions,
        or if you would like to make a complaint, please contact us by e-mail at
        privacy@poool.party.
      </Text>
    </Page>
  );
};

export default Privacy;
