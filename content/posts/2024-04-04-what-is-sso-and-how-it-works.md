---
date: 2024-04-04
title: 'How does Single Sign-On (SSO) work?'
template: post
featuredImage: '../thumbnails/auth0.png'
thumbnail: '../thumbnails/auth0.png'
slug: how-does-sso-signle-sign-on-works-for-applications
categories:
  - nodejs
  - javascript
  - sso
tags:
  - nodejs
  - javascript
  - sso
---

**Single Sign-On (SSO)** is an authentication process that allows users to access multiple applications with a single login. This is accomplished using a central authentication server that stores the user’s credentials and verifies them for each application.

The idea of SSO is not new in the Cloud era. The on-premises identity solutions that enabled businesses to safely link their PCs, networks, and servers in the middle to late 1990s are the source of SSO technology. Around this time, companies started using specialized systems to handle user IDs, such as **Lightweight Directory Access Protocol (LDAP)** and **Microsoft Active Directory (AD)**. After that, they used on-premises SSO or Web Access Management (WAM) products to protect access.

The actors on the SSO stage
===========================

There are three key players in the SSO game:

*   **Identity Provider (IdP):** This is the central authentication server. It’s where you enter your credentials and get verified. Think of it as a high-security building entrance.
*   **Service Provider (SP):** These individual applications rely on SSO for user login. Your work email, project management tool, and CRM platform can all be SPs. Imagine these as individual offices within the secure building.
*   **SSO Server:** This is the bridge between the IdP and SPs. It handles the communication and securely transmits authentication tokens between them. Think of it as a secure hallway connecting the entrance to the various offices.

The SSO workflow
================

Google and other services are excellent examples of how SSO works. Let’s take the example of trying to **access Trello using your Google account**. You don’t need to create a new user account on Trello and remember a new set of usernames/passwords.

For example, when you try to **log in to Trello with your Google account**, it redirects you to the central service hosted on accounts.google.com. Here, you will see a sign-in form to input your credentials. If the authentication process is successful, Google redirects you to Trello, where you can gain access where you are automatically signed in.

![](https://miro.medium.com/v2/resize:fit:700/0*l4ina-mu_aNlNExT.png)

Accessing Trello via a Google account

Here are the steps that happen if you want to access Trello by using your Google account:

1.  **User requests access**: Use the Trello login web page and select Google account as a login method.
2.  **Redirection to IdP**: Trello redirects the user to the Google login page.
3.  **Login page served**: The user is served with the Google login page.
4.  **Credentials entered**: The user enters their Google credentials.
5.  **SSO Server verification**: Google sends authentication info to the SSO Authorization server
6.  **Authentication at IdP:** The Authorization server returns the auth token (SAML) if the credentials are valid.
7.  **Access granted**: Google sends the auth token to the Trello
8.  **Validate token**: In the last step, Trello sends the token to the Google Authorization server to validate it
9.  **Token valid**: If the token is valid, Trello will allow access to the user and store the session for future interactions

![](https://miro.medium.com/v2/resize:fit:700/0*WMhgjLIlNzgDCzvK.png)

The SSO Workflow

Benefits of SSO
===============

There are multiple benefits of SSO, namely:

*   **Improved user experience**: Users do not need to remember multiple usernames and passwords.
*   **Increased security**: Users are less likely to reuse passwords across applications.
*   **Simplified user access auditing**: Ensuring the appropriate individuals have access to resources and sensitive data can be challenging. SSO solutions can configure user access permissions according to their role, department, and seniority level.

Disadvantages of SSO
====================

The SSO comes with some essential disadvantages, too:

*   **Single point of failure**: One of the most notable disadvantages is that SSO creates a single point of failure. The attacker could access all connected applications and services if the SSO system is compromised.
*   **Security risks**: If credentials are compromised, the security of all connected applications could be at risk.
*   **App compatibility**: Occasionally, an application isn’t configured correctly to work with an SSO system. Application providers using Kerberos, OAuth, or SAML should be able to perform true SSO. If not, your SSO solution doesn’t offer complete coverage and is another password that users must remember.

Types of SSO
============

To work with SSO, you should know different standards and protocols. Some common types of protocols are:

*   **SAML**: This is the most common type of SSO. It uses the SAML protocol to exchange authentication information between the SSO server and applications.
*   **Open Authorization (OAuth) 2.0)**: It provides delegated access to server resources on behalf of a resource owner. It specifies how tokens are transferred, allowing a user’s identity to be authenticated by an IDP and the credentials to be used to access APIs.
*   **Open ID Connect (OIDC)** is a newer type of SSO based on OAuth 2.0. It is a more straightforward protocol than SAML and more accessible to integrate with web applications.

> To learn more about OAuth 2.0, check the following [**link**](https://newsletter.techworld-with-milan.com/i/138606726/how-does-oauth-work). Note that you also can [**use OAuth 2.0 from Postman**](https://learning.postman.com/docs/sending-requests/authorization/oauth-20/).

![](https://miro.medium.com/v2/resize:fit:700/0*wS5JV5uTUPLF6llR.png)

SSO protocols

Some other SSO types, such as **Kerberos** and **Smart card authentication**, are not widely used.

*   **Kerberos** allows users to obtain service tickets from the KDC using their credentials. These tickets are then presented to applications for access, eliminating the need for repeated logins. However, Kerberos relies on shared secrets between the KDC and all participants, making it less suitable for internet-facing SSO due to security concerns like compromised servers exposing credentials.
*   **A smart card** that holds an identity works with the SSO system (like a lock) to grant access to applications (doors) without needing separate logins for each. It adds a physical element to the authentication process, making it more resistant to unauthorized access. Yet, the user must physically carry it.

Selecting the proper SSO protocol
=================================

When selecting the **proper** protocol, one should take into account the following:

*   **Enterprise vs. consumer applications**: SAML is often preferred for enterprise applications due to its extensive support and integration capabilities with enterprise identity providers and complex authentication scenarios. OAuth 2.0 and OIDC are more suited for consumer-facing applications, offering flexibility and compatibility with mobile and web applications.
*   **Authorization vs. authentication**: If your primary need is authentication (verifying user identity), SAML or OIDC are your go-to options. OIDC, built on top of OAuth 2.0, provides an additional identity layer over OAuth’s authorization capabilities. Use OAuth 2.0 when your application needs to request access to user resources without exposing user passwords.
*   **Evaluate application and platform compatibility:** Check the SSO protocols’ compatibility with your existing infrastructure and the applications you plan to integrate. Some legacy or enterprise systems might support SAML more broadly, while modern applications often favor OAuth 2.0 and OIDC because they are API-friendly.
*   **Consider the user experience:** OIDC and OAuth 2.0’s modern, token-based approach can offer a smoother and more integrated user experience, especially for web and mobile applications.
*   **Future-proofing:** Consider the future direction of your application ecosystem. Are you moving towards cloud-based services, APIs, and mobile apps? OAuth 2.0 and OIDC may offer more flexibility and are generally considered more forward-looking in cloud and mobile services.
*   **Compliance and regulatory requirements:** Ensure the chosen protocol meets any specific regulatory requirements relevant to your industry, such as GDPR, HIPAA, or others that may dictate specific security or privacy standards.

SSO implementations
===================

Many products on the market can be used for the SSO:

*   [**Microsoft Entra ID**](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id) (formerly known as a Microsoft Active Directory). Ideal for organizations already invested in the Microsoft ecosystem, it offers seamless integration with Office 365, Dynamics CRM, and other Microsoft services. It’s known for its robust security features and comprehensive management capabilities.
*   [**Okta**](https://www.okta.com/products/single-sign-on/) is a popular cloud-based SSO solution known for its ease of use, scalability, and wide range of application integrations. It’s a strong option for organizations seeking a comprehensive identity and access management (IAM) platform.
*   [**Ping Identity**](https://www.pingidentity.com/en/platform/capabilities/single-sign-on.html). Known for its flexibility, Ping Identity caters to enterprises with complex security requirements. It offers strong mobile and API security options, making it suitable for organizations needing high levels of customization and security.
*   [**OneLogin**](https://www.onelogin.com/product/sso). With a focus on simplicity and integration, OneLogin offers a straightforward SSO solution that works well for small to medium-sized businesses. It provides real-time threat detection and AI-powered authentication for enhanced security.
*   [**Auth0**](https://auth0.com/learn/how-to-implement-single-sign-on) is favored for its developer-friendly approach. It provides powerful customization options, making it a go-to for organizations that must tailor their authentication flows. It supports a wide range of programming languages and frameworks.

![](https://miro.medium.com/v2/resize:fit:700/0*vq7UkmsWLlcOW2zO.png)

SSO Vendors

Thanks for reading, and stay awesome!