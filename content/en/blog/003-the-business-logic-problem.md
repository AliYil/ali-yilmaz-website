---
title: "The 'Business Logic' Problem"
description: "What imperative programming, declarative programming, and a beaver have in common"
date: 2026-10-30
author: "Ali Yılmaz"
readTime: "5 min"
tags:
  - business-logic
  - dsl
  - bever
icon: "lucide:briefcase-business"
image: ""
---

You're a developer, and a task lands on your desk.

> Move permission to close activity records from role X to role Y.

You open the application code in your IDE. In front of you is the company's enterprise application, a codebase spanning hundreds of files. Some contain 1,000 lines of code. Much of it handles endpoints, validation, authorization, data access, and logging: the **boilerplate** that sits outside the business rules and business logic. You don't even know where to start, because finding the business rules you actually need to work on feels like looking for a needle in a haystack.

In today's business application codebases, this boilerplate and the code that implements business logic are intertwined. For years, this has had me asking, "What if we separated them?" No, I don't mean moving them into different folders or putting them in separate code layers. Those are steps forward, but the separation I have in mind is something else.

## Imperative Code

Traditional application code is **imperative**: it tells the machine what to do. Here's a rough example:

    Do A;
    Do B with parameter C;
    If D == E:
        Do F;

The operations run in order, from top to bottom. This structure is a natural fit for a task that will ultimately run on a processor. After all, processors execute compiled opcodes by working through a sequence of instructions.

This structure works well for telling a machine what to do, step by step. For example, to update a file, you might give it these instructions:

    Open file X;
    Add a line of text;
    Close the file;

## Declarative Code

Now let's look at the counterpart to *imperative* programming: *declarative* programming.

    A is defined as follows
    B consists of:
        A property C
        A property D defined like this

Rather than giving instructions, it describes a **structure** or **data**. It's also used to store data and represent **serialized** data. XML, CSS, and JSON are examples of *declarative* code.

Many areas that once used *imperative* code have moved to a *declarative* approach. For example, code that defines user interfaces is now almost exclusively *declarative* (think HTML and CSS). With the rise of more modern UI libraries and *frameworks* such as React, representing data in the interface has also become *declarative*. We no longer have to read every input in a form one by one and turn it into JSON when the user clicks **Submit**; *binding* a data object to the form elements takes care of that.

## Where Business Logic Belongs

How do we write a rule like "Orders of $5,000 or more require manager approval" in a business application?

Because the programming language we use is *imperative*, we force ourselves to express the rule in that form.

```cs
    // When submitting an order:
    if (order.Amount < 5000)
    {
        order.Status = Status.Approved;
    }
    else
    {
        createApproval(order, Role.Manager);
    }

    // When approving an order:
    if(User.IsInRole(Role.Manager))
    {
        order.Status = Status.Approved;
    }
```

At first glance, there's nothing wrong with this code. It's short and readable. The problems emerge over time.

- **The rule only ran at submission time.** A $4,000 order was approved, then its amount was updated to $6,000. The order is still approved. You have to put the rule everywhere the amount can change, including the update endpoint.
- **A new way to create orders appears.** A year later, a bulk import feature and a partner API start creating orders too. The rule's code is either copied or forgotten. If it's forgotten, nothing raises an error.
- **Imagine the rule changes.** Gold customers now get a $10,000 threshold. How many places do you need to change? How do you know you've found them all?

None of these problems comes down to a bad developer. They all have the same root cause: **an `if` describes a single path, while a business rule makes a claim about every path.** The statement "No order of $5,000 or more can be approved without manager approval" applies to every path that leads to that state. *Imperative* code can only express it one path at a time.

## The Project Manager's Question

> Can an order of $5,000 or more reach the approved state without manager approval?

In an *imperative* codebase, the developer's answer is:

> I need to check every place that updates the `Status` and `Amount` fields.

And that answer is only valid until the next *commit*. Tests don't settle the question either, because they only check the paths someone thought of.

What if, instead of scattering the rule across different paths, we wrote it as a statement about the order itself: **declaratively**?

    Entity: Order
        Field: Amount
        Field: Status (Draft, Approved)
        Field: ApprovedBy
        Rule: If Status = Approved, Amount must be < 5000 or ApprovedBy must be a manager

There's no "when to check" here. It doesn't matter which endpoint or screen the order came from. If the order is going to be saved, the rule must hold. And the answer to the project manager's question is a single, readable line.

The same applies to the task at the start of this post. Instead of searching for `Role.X` and figuring out which of the 40 results relate to closing a record, the change becomes a one-line diff. Even a business analyst who doesn't write code can review it.

## Introducing Bever: A Business Logic Language

![Bever](/images/blog/003-the-business-logic-problem/bever-logo.svg){width="360" class="dark:hidden"}
![Bever](/images/blog/003-the-business-logic-problem/bever-logo-on-dark.svg){width="360" class="hidden dark:block"}

Following these questions led me to build [Bever](https://bever.dev). With a beaver as its mascot, Bever is a declarative language for defining the entities, rules, and permissions of business applications. Here's how the rule above can be written today:

```bev
Identity

Role Sales
Role Manager

Entity Order
    Field Number Text(20)
    Field Amount Money
    Field Status Enum(Draft, Approved) = Draft
    Field ApprovedBy -> Identity?

    Rule Status != Approved Or Amount < 5000 Or ApprovedBy != Null "Orders of 5000 or more need a manager's approval"

Action Create, Read Order
    By Sales
    By Manager

Action Update Order
    By Manager
```

<figure>
  <img src="/images/blog/003-the-business-logic-problem/order-validation.jpg" alt="Order validation">
  <figcaption>The screen you get when you run the code above with Bever, and the error message you see if you try to break the rule.</figcaption>
</figure>

The rule is checked on every create and update, against the record's state after the change. So a request to change an approved $4,000 order to $6,000 is rejected if no approver is set. A new import tool using the API generated from the model is subject to the same rule; nobody has to copy it.

Permissions are just as readable. A change similar to the task at the start of this post might look like this:

```
    Action Update Activity
Remove: By X
Add:    By Y
```

The framework handles the remaining *boilerplate*: endpoints, validation, and permission checks. Its built-in UI scaffold also gives you screens with the basic functionality already in place.

## What It Doesn't Solve Yet

Bever is still in the pre-alpha stage. It has a long way to go before it can fully deliver the approach I'm arguing for in this post.

- `Sales` can create an order directly as `Approved` and set themselves as `ApprovedBy`; the rule doesn't check whether the approver is actually a manager.
- `Update` permission applies at the record level. `Sales` can't edit their own draft. A manager can also put someone else's identity in `ApprovedBy`.
- An order approved at $6,000 can be increased to $50,000 because `ApprovedBy` is already set.
- Named actions such as "Close" or "Approve," state transitions, and conditional permissions aren't available yet; they're all on the [roadmap](https://bever.dev/roadmap). For now, permissions are defined at the create, read, update, and delete level.

There's also a fair objection: "I can solve this with a good domain model and an `Order.Approve()` method." Yes, a well-designed domain model fixes a lot. But the rule is still written in code; a new path can bypass it. It's also written in the same language as the *boilerplate*. My goal is to make this work more efficient with a **domain-specific language (DSL)**.

I'm not arguing that all code should be declarative. Code outside business logic and rules can stay *imperative*. But "Orders of $5,000 or more require manager approval" isn't an instruction; it's a rule about the business itself. We should be able to write it as a rule.

## A Fit for the AI Era

Remember the point above about "a new way to create orders"? That used to happen once a year. With AI agents, it could happen every week.

Imagine telling an agent:

> Add bulk import for orders.

If the rule is scattered throughout the codebase as `if` statements, the agent might write something like this:

```cs
foreach (var row in rows)
{
    _db.Orders.Add(new Order
    {
        Amount = row.Amount,
        Status = row.Status
    });
}
```

The code compiles, and the tests the agent wrote pass. There's no incorrect line here; there's a missing line. And a missing line doesn't show up in the *diff*. The reviewer has to remember that the rule belongs here too.

When the rule lives in the model, an import tool the agent writes using the API generated from that model is subject to the same rule. To relax it, you have to change the model, which produces a one-line change that's hard to overlook:

```
Remove: Rule Status != Approved Or Amount < 5000 Or ApprovedBy != Null "..."
Add:    Rule Status != Approved Or Amount < 20000 Or ApprovedBy != Null "..."
```

So when we ask, "Who's going to review the code AI writes?", the amount you need to review gets smaller. I also think that, in future versions, being able to map out an application's business logic from a short `.bev` file will help use tokens more efficiently than scanning the entire codebase. That's one of the reasons I'm building Bever.

## Feedback

The project is open source. The core projects are licensed under Apache 2.0. You can contribute on [GitHub](https://github.com/bever-team). It's still very early, so it needs plenty of feedback and experimentation. Trying it on a small project *(I wouldn't recommend it for serious projects yet)* and sharing your feedback would be a big help.
