# Details

Date : 2022-11-24 16:34:39

Directory /home/mn/Documents/Hospital/hospital-backend/src

Total : 63 files,  2282 codes, 4 comments, 436 blanks, all 2722 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [src/app/app.controller.ts](/src/app/app.controller.ts) | TypeScript | 18 | 0 | 5 | 23 |
| [src/app/app.module.ts](/src/app/app.module.ts) | TypeScript | 51 | 0 | 2 | 53 |
| [src/app/app.service.ts](/src/app/app.service.ts) | TypeScript | 24 | 0 | 5 | 29 |
| [src/app/auth/auth.controller.ts](/src/app/auth/auth.controller.ts) | TypeScript | 36 | 0 | 6 | 42 |
| [src/app/auth/auth.module.ts](/src/app/auth/auth.module.ts) | TypeScript | 22 | 0 | 2 | 24 |
| [src/app/auth/auth.service.ts](/src/app/auth/auth.service.ts) | TypeScript | 45 | 0 | 8 | 53 |
| [src/app/auth/jwt-auth.guard.ts](/src/app/auth/jwt-auth.guard.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/app/auth/jwt.strategy.ts](/src/app/auth/jwt.strategy.ts) | TypeScript | 16 | 0 | 3 | 19 |
| [src/app/auth/local-auth.guard.ts](/src/app/auth/local-auth.guard.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/app/auth/local.strategy.ts](/src/app/auth/local.strategy.ts) | TypeScript | 15 | 0 | 3 | 18 |
| [src/app/auth/roles.decorator.ts](/src/app/auth/roles.decorator.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/app/auth/roles.guard.ts](/src/app/auth/roles.guard.ts) | TypeScript | 30 | 0 | 4 | 34 |
| [src/app/customers/customers.controller.ts](/src/app/customers/customers.controller.ts) | TypeScript | 80 | 0 | 14 | 94 |
| [src/app/customers/customers.module.ts](/src/app/customers/customers.module.ts) | TypeScript | 20 | 0 | 2 | 22 |
| [src/app/customers/customers.service.ts](/src/app/customers/customers.service.ts) | TypeScript | 114 | 0 | 22 | 136 |
| [src/app/customers/dto/create-customer.dto.ts](/src/app/customers/dto/create-customer.dto.ts) | TypeScript | 55 | 0 | 14 | 69 |
| [src/app/customers/dto/customer-search.dto.ts](/src/app/customers/dto/customer-search.dto.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [src/app/customers/dto/update-customer.dto.ts](/src/app/customers/dto/update-customer.dto.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [src/app/doctors/doctors.controller.ts](/src/app/doctors/doctors.controller.ts) | TypeScript | 60 | 0 | 9 | 69 |
| [src/app/doctors/doctors.module.ts](/src/app/doctors/doctors.module.ts) | TypeScript | 22 | 0 | 2 | 24 |
| [src/app/doctors/doctors.service.ts](/src/app/doctors/doctors.service.ts) | TypeScript | 103 | 1 | 21 | 125 |
| [src/app/doctors/dto/create-doctor.dto.ts](/src/app/doctors/dto/create-doctor.dto.ts) | TypeScript | 43 | 0 | 12 | 55 |
| [src/app/doctors/dto/doctor.dto.ts](/src/app/doctors/dto/doctor.dto.ts) | TypeScript | 12 | 0 | 1 | 13 |
| [src/app/doctors/dto/find-available.dto.ts](/src/app/doctors/dto/find-available.dto.ts) | TypeScript | 7 | 0 | 3 | 10 |
| [src/app/doctors/dto/update-doctor.dto.ts](/src/app/doctors/dto/update-doctor.dto.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/app/resources/dto/create-resource.dto.ts](/src/app/resources/dto/create-resource.dto.ts) | TypeScript | 12 | 0 | 5 | 17 |
| [src/app/resources/dto/update-resource.dto.ts](/src/app/resources/dto/update-resource.dto.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/app/resources/resources.controller.ts](/src/app/resources/resources.controller.ts) | TypeScript | 50 | 0 | 7 | 57 |
| [src/app/resources/resources.module.ts](/src/app/resources/resources.module.ts) | TypeScript | 18 | 0 | 2 | 20 |
| [src/app/resources/resources.service.ts](/src/app/resources/resources.service.ts) | TypeScript | 53 | 0 | 12 | 65 |
| [src/app/services/dto/create-service.dto.ts](/src/app/services/dto/create-service.dto.ts) | TypeScript | 37 | 0 | 9 | 46 |
| [src/app/services/dto/update-service.dto.ts](/src/app/services/dto/update-service.dto.ts) | TypeScript | 24 | 0 | 5 | 29 |
| [src/app/services/services.controller.ts](/src/app/services/services.controller.ts) | TypeScript | 52 | 0 | 7 | 59 |
| [src/app/services/services.module.ts](/src/app/services/services.module.ts) | TypeScript | 20 | 0 | 2 | 22 |
| [src/app/services/services.service.ts](/src/app/services/services.service.ts) | TypeScript | 55 | 0 | 10 | 65 |
| [src/app/treatment-times/dto/create-treatment-time.dto.ts](/src/app/treatment-times/dto/create-treatment-time.dto.ts) | TypeScript | 14 | 0 | 6 | 20 |
| [src/app/treatment-times/dto/update-treatment-time.dto.ts](/src/app/treatment-times/dto/update-treatment-time.dto.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/app/treatment-times/treatment-times.controller.ts](/src/app/treatment-times/treatment-times.controller.ts) | TypeScript | 58 | 0 | 9 | 67 |
| [src/app/treatment-times/treatment-times.module.ts](/src/app/treatment-times/treatment-times.module.ts) | TypeScript | 25 | 0 | 2 | 27 |
| [src/app/treatment-times/treatment-times.service.ts](/src/app/treatment-times/treatment-times.service.ts) | TypeScript | 77 | 0 | 12 | 89 |
| [src/app/treatments/dto/create-treatment.dto.ts](/src/app/treatments/dto/create-treatment.dto.ts) | TypeScript | 25 | 0 | 8 | 33 |
| [src/app/treatments/dto/update-treatment.dto.ts](/src/app/treatments/dto/update-treatment.dto.ts) | TypeScript | 11 | 0 | 4 | 15 |
| [src/app/treatments/treatments.controller.ts](/src/app/treatments/treatments.controller.ts) | TypeScript | 55 | 0 | 8 | 63 |
| [src/app/treatments/treatments.module.ts](/src/app/treatments/treatments.module.ts) | TypeScript | 26 | 0 | 2 | 28 |
| [src/app/treatments/treatments.service.ts](/src/app/treatments/treatments.service.ts) | TypeScript | 114 | 2 | 19 | 135 |
| [src/app/users/create-users.spec.ts](/src/app/users/create-users.spec.ts) | TypeScript | 52 | 0 | 6 | 58 |
| [src/app/users/dto/create-user.dto.ts](/src/app/users/dto/create-user.dto.ts) | TypeScript | 37 | 0 | 10 | 47 |
| [src/app/users/dto/update-user.dto.ts](/src/app/users/dto/update-user.dto.ts) | TypeScript | 39 | 0 | 10 | 49 |
| [src/app/users/users.controller.ts](/src/app/users/users.controller.ts) | TypeScript | 51 | 0 | 7 | 58 |
| [src/app/users/users.module.ts](/src/app/users/users.module.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/app/users/users.service.ts](/src/app/users/users.service.ts) | TypeScript | 59 | 0 | 13 | 72 |
| [src/app/utils/http-exception.filter.ts](/src/app/utils/http-exception.filter.ts) | TypeScript | 26 | 0 | 3 | 29 |
| [src/app/utils/logger.middleware.ts](/src/app/utils/logger.middleware.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [src/main.ts](/src/main.ts) | TypeScript | 21 | 0 | 2 | 23 |
| [src/schemas/customer.schema.ts](/src/schemas/customer.schema.ts) | TypeScript | 86 | 0 | 20 | 106 |
| [src/schemas/doctor.schema.ts](/src/schemas/doctor.schema.ts) | TypeScript | 74 | 0 | 17 | 91 |
| [src/schemas/resource.schema.ts](/src/schemas/resource.schema.ts) | TypeScript | 25 | 1 | 8 | 34 |
| [src/schemas/service.schema.ts](/src/schemas/service.schema.ts) | TypeScript | 61 | 0 | 13 | 74 |
| [src/schemas/treatment-time.schema.ts](/src/schemas/treatment-time.schema.ts) | TypeScript | 34 | 0 | 8 | 42 |
| [src/schemas/treatment.schema.ts](/src/schemas/treatment.schema.ts) | TypeScript | 45 | 0 | 10 | 55 |
| [src/schemas/user.schema.ts](/src/schemas/user.schema.ts) | TypeScript | 64 | 0 | 13 | 77 |
| [src/schemas/utils/base.schema.ts](/src/schemas/utils/base.schema.ts) | TypeScript | 29 | 0 | 5 | 34 |
| [src/schemas/utils/transform.ts](/src/schemas/utils/transform.ts) | TypeScript | 11 | 0 | 1 | 12 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)