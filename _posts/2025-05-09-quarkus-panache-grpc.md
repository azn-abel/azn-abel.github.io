---
layout: post
title: Quarkus, Panache, and gRPC
categories: [Java, Quarkus, gRPC]
---

Quarkus, Panache, and gRPC are three technologies I'm playing with right now. Here's what I like
and dislike about each of them.

## Quarkus

Quarkus is a Java framework designed to meet the growing adoption of the cloud, containers, and Kubernetes.

From my (a developer's) standpoint, Quarkus feels a lot like Spring Boot, _but better_. It does a lot things
better right out of the box, including supporting
[hot reloading in dev mode](https://quarkus.io/guides/maven-tooling#dev-mode) and
having [faster startup times](https://quarkus.io/performance/) overall.

The [extension ecosystem](https://quarkus.io/extensions/) is also pretty mature, which is a pleasant
surprise considering how much newer Quarkus is compared to Spring Boot. If you're using many extensions,
Quarkus's [unified configuration model](https://quarkus.io/guides/datasource) makes it super easy to
configure many at once.

These days, I do most of my work in Python and TypeScript, and that's partially because I'm not a fan
of the developer experience with Java. However, Quarkus is definitely something I'll be reaching for
again. I honestly don't have any complaints with it so far.

There's a lot more to Quarkus than I've written about here, and I recommend checking out their
[docs](https://quarkus.io/about/) if you're interested in learning more.

## Panache

Panache is a Quarkus-specific extension that handles a lot of the boilerplate you'd normally write with
something like Spring Data JPA. It defaults to Hibernate ORM under the hood and has sensible defaults, which
allows you to write the minimal amount of code needed to get set up. Panache supports an active record
pattern and a repository pattern. I prefer active records for simple apps, but the choice is yours.

To put it to the test, I built a simple API server to track clicks that users make on specific webpages.
The Click entity is a good example of what makes Panache's active record pattern so great:

```java
@Entity
@Table(name = "click")
public class ClickEntity extends PanacheEntity {
    public String host;
    public double x;
    public double y;
    public String timestamp;
    public String userId;
}
```

No getters and setters, no `.findByUserId()`, it's all baked in by Panache. No need to specify
an `@Id` field either, as primary keys/IDs are generated with an autoincrementing sequence by default
when extending PanacheEntity.

[Fine-grained configuration](https://quarkus.io/guides/hibernate-orm-panache#adding-entity-methods) is
supported, just like with Spring Data JPA. The difference is that you _only write what you need_.

## gRPC

As someone most familiar with REST, gRPC (or RPC in general) didn’t make much sense to me at first, but
getting started was surprisingly easy.

Like with REST, you’ll often define separate DTOs for working with your database and mapping gRPC responses
to Java objects. The key difference is that your API contracts are defined up front using strongly typed
`.proto` files, which servers and clients share directly. That means you don’t need to write extensive
OpenAPI docs or deal with parsing and validating JSON -- the schema itself becomes the contract.

This approach feels a lot like what LinkedIn achieved with Rest.li using the Pegasus Data Language,
where RESTful Java code is generated based on schemas defined in `.pdl` files. The difference, however,
lies in performance: gRPC uses protocol buffers for binary serialization, which is much more efficient
than JSON (used by REST), which needs to be expensively parsed and validated.

Given the similarities between the two, it makes sense why LinkedIn is
[migrating from Rest.li to gRPC](https://www.infoq.com/presentations/grpc-restli/) for the performance gains.

## Conclusion

The three technologies discussed here are still very new to me. I learned most of this while building
a simple Java app that utilizes all three, which you check out
[here](https://github.com/azn-abel/click-tracker-grpc/tree/main).

If there's anything I missed, or if I'm just dead wrong about something, feel free to reach out via one of
the links in the footer! I'm always happy to chat about tech.
