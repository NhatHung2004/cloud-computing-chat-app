import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: "ASIAUUCWGLE3B5GIK6GY",
        secretAccessKey: "SPDreN2inUxqPWGP/89SqjGy9+s+pST+3f7j9K4q",
        sessionToken: "IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJGMEQCICbZzfWi3ISBtoP7HSYG/mly2lTMzjtPK1YyTC202GN8AiA+HV0UMzeMcbNjV1Ha84GtNBokJqXdxZhaGaQncSDa3yq4Agih//////////8BEAEaDDMxODAwODM1MTAzMCIMxrINOMNtaE+G4FsQKowCXQ0gregLNWI878gXQSPjQAKF0z5O4umQ3XNsvAPFQowj/MlLipvxh6z34vUjUn9bHPJiPe73gkurvumfaqUASsgc3lHqzDYoPes00FxnJcBlpSMwMLrnwnivDsWynxNDYNGbKOmUcNzKlpHCS7ilVjcVEjkCUJQvKOaAYTGlCDl7NyyU625U72WgwNwWMjFNeVAv0inyiFrsyKrHdZoAosZBXIWOlhOoN2CtBy1NURc7ATvhDFV9q/rZ0385jWrmY/w36rt5QicXexizBnejXr04AnVsUZXNsWAt5Ngae46iru3BclaAQ9qEUeTmX7tLYEgZNQykvm4UVFfZvRgE6cPtWgFLkEuc9zTFHzDlzpLABjqeAdJ+H0Km+g7LnsSPmf8z7qctZ2DgdEzINTqtiL5TSJ+cQrbMFdK/mr7GL7YSXldFjsv4x7IZPGCytbsNOktWGB55jsn/HpES9K+Ry1/FxHHpTKVjrpzOmrs0LzFeaSrj8uOGK6zV3TYu1IuJVFDM9YXIXjhDu244i4cBbUbDuVYshrMYWzFS19sCpwfXwd5jjnLLtGbnG/cR6aTfUJAP",
    },
});
