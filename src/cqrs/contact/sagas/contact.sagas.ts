import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { auditTime, map, Observable } from 'rxjs';
import { ContactAddedEvent } from '../events/contact-added.event';
import { Injectable } from '@nestjs/common';
import { UpdateCountersCommand } from '../commands/update-counters.command';

@Injectable()
export class ContactSagas {
  @Saga()
  contactAdded(events: Observable<IEvent>): Observable<ICommand> {
    return events.pipe(
      ofType(ContactAddedEvent),
      auditTime(15000), // let's exaggerate the "eventuality" of our eventual consistency here
      map((event) => {
        return new UpdateCountersCommand({ contacts: true });
      }),
    );
  }
}
