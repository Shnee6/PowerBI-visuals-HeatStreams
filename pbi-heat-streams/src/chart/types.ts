/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Colorizer } from '@essex/d3-coloring-scales'
import {
	ICategory,
	ICategoryValueMap,
	ICategorySelectionMap,
	XDomain,
	TimeDomain,
	CategoryId,
} from 'react-heat-streams'
import { IVisualRenderingOptions, IVisualDataOptions } from '../settings/types'

export interface ICategoryData {
	position: Date
	value: number
}

export interface IChartData {
	/**
	 * The category list
	 */
	categories: ICategory[]
	categoriesById: Record<CategoryId, ICategory>
	/**
	 * Data points per category
	 */
	categoryData: ICategoryDataMap
	categoryValues: ICategoryValueMap
	positionDomain: XDomain
	valueDomain: [number, number]
}

export interface IChartProps {
	options: IChartOptions
}

export interface ICategoryDataMap {
	[key: string]: ICategoryData[]
}

export interface IChartOptions {
	renderOptions: IVisualRenderingOptions
	dataOptions: IVisualDataOptions
	data: IChartData
	selections: ICategorySelectionMap
	timeScrub: TimeDomain | null
	width: number
	height: number
	colorizer: Colorizer
	element: HTMLElement
}
