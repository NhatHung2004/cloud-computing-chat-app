import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: "ASIAUUCWGLE3AFTPI5LL",
        secretAccessKey: "GirXaqzv6hnV7zoW8h672SaloMn8RL5AXc4uLy7Q",
        sessionToken: "IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIDCuNGqdet77Boi/NL/7UK3U1OLKkyN3G4se7VW7RFImAiBavYwJbBgSHmnMnnaD20hYjDCEjU8g6kbtbDrGC/fwOiq4Agin//////////8BEAEaDDMxODAwODM1MTAzMCIM2InyTYZ5Gfrx6jNxKowC81KOWMoRj0MJK3hy4Im7aa7YOZekeEOpotltB6x0aNoGMGjDi5gZC2jERtPoyJZlh1joyeoRablTk2u6CHPGZHud6A+NKz3x3RVLh70uV2hHnzQ9S2a67+wkv9+PYN1SLQUAsBUvu47mWlAuau9MtFImw21LgK2bIc4kl2HklXLsrDnVWf7p0+Ju/Z1PuLnZ8oMvIbJ4YSYruhQt+kE+rzGhx297MzkpzrimDS4BfVwnlUZScLX5LiyKa4rYWl6rUXFrHs1NSLDZmU9aq9ABuzqzAod4tOqCgjdRAukazncd8FBb6K2r+Ej+oxE3tQQjlcgvbTtRZlx5EepheOmra3BMxz0cfw/GerFZ6zDh/5PABjqeAZJRQA9YVHKfMA/6GNlQMW9bhGIZb+9o9fbwkgBEbZ9jd0GImL6wp581OPoi/y0lBnSM0bjwUudz2mIK8syoP4M/l2vHufXvOxeSrsYhNaNH9j+21dWfN2aHMPLddi7s4co6rt24E77NXxxpoiwojl5VVEEXVCF7KNEqqKCde60Ywvx8QCZnWKEUvkqsMr37fFWN3sYhNazIV2uHKXhw",
    },
});
