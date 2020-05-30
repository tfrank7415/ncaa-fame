import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';
import { ValueMasterService } from './value-master.service';

// Arrange
// Act
// Assert

// Below code is for testing with angular test bed
describe('MasterService with angular testing support', () => {

  // Master service - where we can put multiple services and method calls
  let masterService: ValueMasterService;

  // service spy
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    // create spy object by passing service and method
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [
        ValueMasterService,
        { provide: ValueService, useValue: spy }
      ]
     });

     // inject the below before each test
    masterService = TestBed.inject(ValueMasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('#getValue should return stubbed value from a spy', () => {
    // create stub value
    const stubValue = 'stub value';

    // call service spy
    valueServiceSpy.getValue.and.returnValue(stubValue);

    expect(masterService.getValue())
      .toBe(stubValue, 'service returned stub value');
    expect(valueServiceSpy.getValue.calls.count())
      .toBe(1, 'spy method was called once');

      // service spy returns
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
      .toBe(stubValue);
  });

  // The below actually uses the real service.  So it makes a service call
  // I am commenting this out so I can use a spy object.
  // it('should use ValueService', () => {
  //   // You can also inject the service into the above beforeEach().
  //   // Then you will only need to write that line of code once.
  //   service = TestBed.inject(ValueService);
  //   expect(service.getValue()).toBe('real value');
  // });


});

// NOTE: The below code works 5.29.20

// describe('MasterService without Angular testing support', () => {
//   let valueMasterService: ValueMasterService;

//   it('#getValue should return real value from the real service', () => {
//     // We create a new instance of the master service and pass it a new instance of the value service.
//     valueMasterService = new ValueMasterService(new ValueService());

//     // We test the value service by calling the same method in the master service.
//     expect(valueMasterService.getValue()).toBe('real value');
//   });

//   it('#getValue should return faked value from a fake object', () => {
//     // fake is an object that we created to mimic the ValueService.getValue() method.
//     // You aren't calling the actual ValueService.  Instead you are creating a fake serive as
//     // an object and setting it 'as' ValueService.
//     const fake =  { getValue: () => 'fake value' };
//     valueMasterService = new ValueMasterService(fake as ValueService);
//     expect(valueMasterService.getValue()).toBe('fake value');
//   });

//   it('#getValue should return stubbed value from a spy', () => {
//     // create value service spy by passing it service name and method name
//     const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);

//     // create stub value
//     const stubValue = 'stub value';

//     // tell value service spy to return the stub value when getValue() is called
//     valueServiceSpy.getValue.and.returnValue(stubValue);

//     // create new instance of valueMasterService
//     valueMasterService = new ValueMasterService(valueServiceSpy);

//     // Test that stub value was returned via spy
//     expect(valueMasterService.getValue())
//       .toBe(stubValue, 'service returned stub value');

//     // test that method was only called once
//     expect(valueServiceSpy.getValue.calls.count())
//       .toBe(1, 'spy method was called once');

//     // test taht most recent getValue() call returned stub value
//     expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
//       .toBe(stubValue);
//   });
// });


// describe('ValueService', () => {
//   let service: ValueService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ValueService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
