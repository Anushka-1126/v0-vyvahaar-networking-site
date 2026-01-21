"use client"

import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, Scale, Phone, Mail, MapPin } from "lucide-react"

export default function LegalPage() {
  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Legal Information</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Important legal documents and policies for Vyvahaar platform
            </p>
          </div>

          <Tabs defaultValue="privacy" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
              <TabsTrigger value="contact">Legal Contact</TabsTrigger>
            </TabsList>

            {/* Privacy Policy */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy Policy
                  </CardTitle>
                  <CardDescription>Last updated: January 15, 2024 | Effective Date: January 1, 2024</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <h3>1. Introduction</h3>
                    <p>
                      Welcome to Vyvahaar ("we," "our," or "us"). We are committed to protecting your privacy and
                      ensuring the security of your personal information. This Privacy Policy explains how we collect,
                      use, disclose, and safeguard your information when you use our platform.
                    </p>

                    <h3>2. Information We Collect</h3>
                    <h4>2.1 Personal Information</h4>
                    <ul>
                      <li>Name, age, and contact information (phone number, email address)</li>
                      <li>Profile information including bio, interests, and location</li>
                      <li>Photos and other content you choose to share</li>
                      <li>Communication data including messages and call logs</li>
                    </ul>

                    <h4>2.2 Technical Information</h4>
                    <ul>
                      <li>Device information and IP address</li>
                      <li>Usage data and platform interactions</li>
                      <li>Location data (with your permission)</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>

                    <h3>3. How We Use Your Information</h3>
                    <ul>
                      <li>To provide and maintain our services</li>
                      <li>To connect you with other senior citizens</li>
                      <li>To send you notifications about events and activities</li>
                      <li>To improve our platform and user experience</li>
                      <li>To ensure platform safety and security</li>
                      <li>To comply with legal obligations</li>
                    </ul>

                    <h3>4. Information Sharing and Disclosure</h3>
                    <p>
                      We do not sell, trade, or otherwise transfer your personal information to third parties without
                      your consent, except in the following circumstances:
                    </p>
                    <ul>
                      <li>With your explicit consent</li>
                      <li>To comply with legal requirements</li>
                      <li>To protect our rights and safety</li>
                      <li>With trusted service providers who assist in platform operations</li>
                    </ul>

                    <h3>5. Data Security</h3>
                    <p>
                      We implement appropriate technical and organizational security measures to protect your personal
                      information against unauthorized access, alteration, disclosure, or destruction. These measures
                      include:
                    </p>
                    <ul>
                      <li>Encryption of sensitive data</li>
                      <li>Regular security assessments</li>
                      <li>Access controls and authentication</li>
                      <li>Secure data storage and transmission</li>
                    </ul>

                    <h3>6. Your Rights and Choices</h3>
                    <p>You have the right to:</p>
                    <ul>
                      <li>Access and review your personal information</li>
                      <li>Update or correct your information</li>
                      <li>Delete your account and associated data</li>
                      <li>Opt out of certain communications</li>
                      <li>Request data portability</li>
                    </ul>

                    <h3>7. Data Retention</h3>
                    <p>
                      We retain your personal information for as long as necessary to provide our services and fulfill
                      the purposes outlined in this policy. When you delete your account, we will delete or anonymize
                      your personal information within 30 days.
                    </p>

                    <h3>8. International Data Transfers</h3>
                    <p>
                      Your information may be transferred to and processed in countries other than your own. We ensure
                      appropriate safeguards are in place to protect your information during such transfers.
                    </p>

                    <h3>9. Children's Privacy</h3>
                    <p>
                      Vyvahaar is designed for senior citizens aged 50 and above. We do not knowingly collect personal
                      information from individuals under 50 years of age.
                    </p>

                    <h3>10. Changes to This Policy</h3>
                    <p>
                      We may update this Privacy Policy from time to time. We will notify you of any material changes by
                      posting the new policy on our platform and updating the "Last Updated" date.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Terms and Conditions */}
            <TabsContent value="terms">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Terms and Conditions
                  </CardTitle>
                  <CardDescription>Last updated: January 15, 2024 | Effective Date: January 1, 2024</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <h3>1. Acceptance of Terms</h3>
                    <p>
                      By accessing and using Vyvahaar ("the Platform"), you accept and agree to be bound by the terms
                      and provisions of this agreement. If you do not agree to these terms, please do not use our
                      platform.
                    </p>

                    <h3>2. Eligibility</h3>
                    <p>
                      Vyvahaar is designed exclusively for senior citizens aged 50 and above. By using our platform, you
                      represent and warrant that you meet this age requirement and have the legal capacity to enter into
                      this agreement.
                    </p>

                    <h3>3. User Account and Registration</h3>
                    <ul>
                      <li>You must provide accurate and complete information during registration</li>
                      <li>You are responsible for maintaining the confidentiality of your account</li>
                      <li>You must notify us immediately of any unauthorized use of your account</li>
                      <li>One person may maintain only one account</li>
                    </ul>

                    <h3>4. User Conduct and Responsibilities</h3>
                    <p>You agree to:</p>
                    <ul>
                      <li>Treat all users with respect and kindness</li>
                      <li>Provide truthful and accurate information</li>
                      <li>Respect others' privacy and personal boundaries</li>
                      <li>Not share inappropriate, offensive, or harmful content</li>
                      <li>Not engage in harassment, bullying, or discriminatory behavior</li>
                      <li>Not use the platform for commercial purposes without permission</li>
                    </ul>

                    <h3>5. Platform Usage</h3>
                    <p>
                      Vyvahaar provides a platform for senior citizens to connect, share experiences, and participate in
                      community activities. The platform includes features such as:
                    </p>
                    <ul>
                      <li>Profile creation and management</li>
                      <li>Messaging and communication tools</li>
                      <li>Event discovery and participation</li>
                      <li>Community forums and discussions</li>
                      <li>Voice and video calling capabilities</li>
                    </ul>

                    <h3>6. Content Guidelines</h3>
                    <p>Users are responsible for all content they share. Prohibited content includes:</p>
                    <ul>
                      <li>Illegal, harmful, or offensive material</li>
                      <li>Spam, scams, or fraudulent content</li>
                      <li>Content that violates others' privacy or rights</li>
                      <li>Misleading or false information</li>
                      <li>Content promoting violence or discrimination</li>
                    </ul>

                    <h3>7. Intellectual Property</h3>
                    <p>
                      The Vyvahaar platform, including its design, features, and content, is owned by Vyvahaar
                      Technologies Pvt. Ltd. Users retain ownership of their personal content but grant us a license to
                      use it for platform operations.
                    </p>

                    <h3>8. Privacy and Data Protection</h3>
                    <p>
                      Your privacy is important to us. Please review our Privacy Policy to understand how we collect,
                      use, and protect your information.
                    </p>

                    <h3>9. Subscription and Payment Terms</h3>
                    <ul>
                      <li>Premium features require a paid subscription</li>
                      <li>Subscription fees are non-refundable except as required by law</li>
                      <li>We may change subscription prices with 30 days' notice</li>
                      <li>You may cancel your subscription at any time</li>
                    </ul>

                    <h3>10. Account Termination</h3>
                    <p>
                      We reserve the right to suspend or terminate accounts that violate these terms or engage in
                      behavior harmful to the community. You may also delete your account at any time.
                    </p>

                    <h3>11. Limitation of Liability</h3>
                    <p>
                      Vyvahaar shall not be liable for any indirect, incidental, special, consequential, or punitive
                      damages resulting from your use of the platform. Our total liability is limited to the amount paid
                      for subscription services.
                    </p>

                    <h3>12. Dispute Resolution</h3>
                    <p>
                      Any disputes arising from these terms shall be resolved through arbitration in accordance with
                      Indian law. The courts of New Delhi, India shall have exclusive jurisdiction.
                    </p>

                    <h3>13. Changes to Terms</h3>
                    <p>
                      We may modify these terms at any time. Material changes will be communicated to users with at
                      least 30 days' notice. Continued use of the platform constitutes acceptance of modified terms.
                    </p>

                    <h3>14. Governing Law</h3>
                    <p>
                      These terms are governed by the laws of India. Any legal proceedings must be conducted in English
                      or Hindi.
                    </p>

                    <h3>15. Contact Information</h3>
                    <p>
                      For questions about these terms, please contact us at legal@vyvahaar.com or through the contact
                      information provided in the Legal Contact section.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Legal Contact */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5" />
                    Legal Contact Information
                  </CardTitle>
                  <CardDescription>
                    Contact us for legal inquiries, privacy concerns, or compliance matters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal Department</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-600 dark:text-gray-300">legal@vyvahaar.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-gray-600 dark:text-gray-300">+91 11 4567 8900</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Officer</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-600 dark:text-gray-300">privacy@vyvahaar.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-gray-600 dark:text-gray-300">+91 11 4567 8901</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Corporate Address</h3>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <p className="font-medium">Vyvahaar Technologies Pvt. Ltd.</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Tower A, 5th Floor
                          <br />
                          Cyber City, Sector 24
                          <br />
                          Gurgaon, Haryana 122002
                          <br />
                          India
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Business Hours</h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p>
                        <strong>Legal Department:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST
                      </p>
                      <p>
                        <strong>Privacy Inquiries:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST
                      </p>
                      <p>
                        <strong>Emergency Legal Matters:</strong> 24/7 via email
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Regulatory Information</h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p>
                        <strong>Company Registration:</strong> U72900HR2023PTC112345
                      </p>
                      <p>
                        <strong>GST Number:</strong> 06AABCV1234F1Z5
                      </p>
                      <p>
                        <strong>Data Protection Officer:</strong> Ms. Priya Sharma (dpo@vyvahaar.com)
                      </p>
                      <p>
                        <strong>Compliance Officer:</strong> Mr. Amit Kumar (compliance@vyvahaar.com)
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Important Notice</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      For urgent legal matters or data breaches, please contact us immediately at legal@vyvahaar.com
                      with "URGENT" in the subject line. We aim to respond to all legal inquiries within 48 hours during
                      business days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}
