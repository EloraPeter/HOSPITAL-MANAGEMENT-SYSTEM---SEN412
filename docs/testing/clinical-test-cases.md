# Clinical Records Module Test Cases
**PR**: #4  
**Author**: [Clinical Team]  
**Last updated**: 2026-05-19  
**Status**: In Progress

## Test Cases

| ID       | Test Case                    | Precondition                  | Steps                                                                 | Expected Result                                      | Status    |
|----------|------------------------------|-------------------------------|-----------------------------------------------------------------------|------------------------------------------------------|-----------|
| CLIN-01  | Add New Clinical Record      | Patient exists                | 1. Select patient<br>2. Enter diagnosis, notes, vitals<br>3. Save    | Record saved and appears in patient history          | ⬜ Pending |
| CLIN-02  | View Patient Records         | Records exist                 | Open patient profile → Clinical tab                           | All records displayed with dates                     | ⬜ Pending |
| CLIN-03  | Edit Existing Record         | Record exists                 | Click edit → Modify diagnosis/notes → Save                    | Changes saved with updated timestamp                 | ⬜ Pending |
| CLIN-04  | Delete Clinical Record       | Record exists                 | Click delete → Confirm                                        | Record removed from list                             | ⬜ Pending |
| CLIN-05  | Search/Filter Records        | Multiple records              | Use search bar or filter by date/diagnosis                    | Only matching records shown                          | ⬜ Pending |

**Additional Tests Needed**: Permission checks (Doctor vs Nurse), Attachment upload, Audit trail.
