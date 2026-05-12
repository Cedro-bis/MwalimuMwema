# Security Specification: Mwalimu Mwema

## 1. Data Invariants
- A curriculum must always belong to the UID of the user who created it.
- Chapter details must reside under a specific curriculum path.
- Users can only read and write their own data.
- **Email verification is required** for all write operations to ensure data integrity and prevent spam/fake accounts as per user request.

## 2. The Dirty Dozen (Attack Scenarios)

| ID | Attack Name | Payload / Action | Expected Result |
|----|-------------|------------------|-----------------|
| 1  | Identity Theft | Create curriculum with `userId` of another user | PERMISSION_DENIED |
| 2  | Not Verified | Create user profile with `email_verified: false` | PERMISSION_DENIED |
| 3  | Cross-User Read | Authenticated User A tries to get User B's curriculum | PERMISSION_DENIED |
| 4  | Shadow Update | Update curriculum with extra field `isAdmin: true` | PERMISSION_DENIED (strict schema) |
| 5  | Anonymous Spam | Create profile without being signed in | PERMISSION_DENIED |
| 6  | Email Spoofing | Update profile to change `email` field | PERMISSION_DENIED (immutable email) |
| 7  | Resource Exhaustion | Create chapter details with `content` > 1MB | PERMISSION_DENIED (size limit) |
| 8  | ID Poisoning | Create curriculum with ID `../../etc/passwd` | PERMISSION_DENIED (isValidId regex) |
| 9  | Orphan Write | Create chapter details under a userId that isn't yours | PERMISSION_DENIED |
| 10 | Unauthenticated List | Try to list `/users` collection | PERMISSION_DENIED (default deny) |
| 11 | State Shortcutting | Change curriculum `level` after creation | PERMISSION_DENIED (if logic enforced) |
| 12 | PII Leak | Get another user's profile | PERMISSION_DENIED |

## 3. Test Verification
The `firestore.rules` handles these invariants using `request.auth.uid` validation, `email_verified` checks, and strict data structure validation.
