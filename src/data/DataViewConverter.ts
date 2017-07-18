/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
module essex.visuals.gantt.dataconvert {
    "use strict";
    import DataView = powerbi.DataView;
    import ISelectionManager = powerbi.extensibility.ISelectionManager;
    import GanttData = essex.visuals.gantt.GanttData;
    import VisualDataOptions = essex.visuals.gantt.VisualDataOptions;
    const _ = window['_'];

    export class DataViewConverter {
        constructor(private selectionManager: ISelectionManager) {
        }

        public convertDataView(dataView: DataView, options: VisualDataOptions): GanttData {
            // TODO: when we support date-based drilldown, we have to process the matrix-form data view
            return convertCategoricalDataView(dataView, options);
        }

        public unpackSelectedCategories(dataView: DataView): { [key: string]: Category } {
            const selection = this.selectionManager.getSelectionIds();
            const category = _.get(dataView, 'categorical.categories[0]');

            const selectedCategories = {};
            if (category) {
                selection.forEach(s => {
                    try {
                        const selectorData = (<any>s).selector.data[0].expr;
                        if (_.isEqual(selectorData.left.source, (<any>category).source.expr.source)) {
                            selectedCategories[selectorData.right.value] = true;
                        }
                    } catch (err) {
                        console.log("Error Processing Selection", s, err);
                    }
                });
            }

            return selectedCategories;
        }
    }
}