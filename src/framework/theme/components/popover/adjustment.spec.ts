/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAdjustmentHelper, NbAdjustment } from './adjustment.helper';
import { NbPlacement } from './positioning.helper';

describe('adjustment-helper', () => {
  const placedRect: ClientRect = {
    top: 50,
    bottom: 100,
    left: 50,
    right: 100,
    height: 50,
    width: 50,
  };

  const hostRect = {
    topLeft: {
      top: 10,
      bottom: 110,
      left: 10,
      right: 110,
      height: 100,
      width: 100,
    },
    topRight: {
      top: 10,
      bottom: 110,
      left: 1000,
      right: 1100,
      height: 100,
      width: 100,
    },
    bottomLeft: {
      top: 1000,
      bottom: 1100,
      left: 10,
      right: 110,
      height: 100,
      width: 100,
    },
    bottomRight: {
      top: 1000,
      bottom: 1100,
      left: 1000,
      right: 1100,
      height: 100,
      width: 100,
    },
  };

  describe('clockwise strategy', () => {
    const strategy = NbAdjustment.CLOCKWISE;

    describe('top placement', () => {
      const placement = NbPlacement.TOP;

      it('adjust top to right when host in top left corner', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.topLeft, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.RIGHT);
        expect(adjustment.position.top).toEqual(1035);
        expect(adjustment.position.left).toEqual(1120);
      });

      it('adjust top to bottom when host in top right corner', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.topRight, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.BOTTOM);
        expect(adjustment.position.top).toEqual(1120);
        expect(adjustment.position.left).toEqual(2025);
      });

      it('doesn\'t adjust top when in bottom right corner', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.bottomRight, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.TOP);
        expect(adjustment.position.top).toEqual(1940);
        expect(adjustment.position.left).toEqual(2025);
      });

      it('doesn\'t adjust top when in bottom left corner', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.bottomLeft, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.TOP);
        expect(adjustment.position.top).toEqual(1940);
        expect(adjustment.position.left).toEqual(1035);
      });

      it('adjust top to left when host in the right part of the narrow rectangular view port', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(120);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.topRight, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.LEFT);
        expect(adjustment.position.top).toEqual(1035);
        expect(adjustment.position.left).toEqual(1940);
      });

      it('doesn\'t change position when there are no suitable positions at all', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(120);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(120);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.topLeft, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.TOP);
        expect(adjustment.position.top).toEqual(950);
        expect(adjustment.position.left).toEqual(1035);
      });
    })
  });

  describe('counterclockwise strategy', () => {
    const strategy = NbAdjustment.COUNTERCLOCKWISE;

    describe('top placement', () => {
      const placement = NbPlacement.TOP;

      it('adjust top to bottom when host in top left corner', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.topLeft, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.BOTTOM);
        expect(adjustment.position.top).toEqual(1120);
        expect(adjustment.position.left).toEqual(1035);
      });

      it('adjust top to left when host in top right corner', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.topRight, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.LEFT);
        expect(adjustment.position.top).toEqual(1035);
        expect(adjustment.position.left).toEqual(1940);
      });

      it('doesn\'t adjust top when in bottom right corner', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.bottomRight, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.TOP);
        expect(adjustment.position.top).toEqual(1940);
        expect(adjustment.position.left).toEqual(2025);
      });

      it('doesn\'t adjust top when in bottom left corner', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1110);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.bottomLeft, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.TOP);
        expect(adjustment.position.top).toEqual(1940);
        expect(adjustment.position.left).toEqual(1035);
      });

      it('adjust top to left when host in the right part of the narrow rectangular view port', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(120);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1110);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.topRight, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.LEFT);
        expect(adjustment.position.top).toEqual(1035);
        expect(adjustment.position.left).toEqual(1940);
      });

      it('doesn\'t change position when there are no suitable positions at all', () => {
        spyOnProperty(window, 'innerHeight', 'get').and.returnValue(120);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(120);
        spyOnProperty(window, 'pageXOffset', 'get').and.returnValue(1000);
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1000);

        const adjustment = NbAdjustmentHelper.adjust(placedRect, hostRect.topLeft, placement, strategy);

        expect(adjustment.placement).toEqual(NbPlacement.TOP);
        expect(adjustment.position.top).toEqual(950);
        expect(adjustment.position.left).toEqual(1035);
      });
    })
  });
});